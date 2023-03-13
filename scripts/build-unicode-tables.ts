import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  compressblockIndexes,
  stringifyBlocks,
} from './stringify-compress-array';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IDNA_MAP_OUTPUT_PATH = path.join(__dirname, '..', 'src', 'idna-map.js');
async function downloadUnicode(version: string) {
  console.log('Resource Files from www.unicode.org ...');
  const uriBase = 'http://www.unicode.org/Public/';
  const idnaTables = uriBase + 'idna/' + version;
  const urls = {
    idnaTestV2: idnaTables + '/IdnaTestV2.txt',
    idnaMappingTable: idnaTables + '/IdnaMappingTable.txt',
    derivedGeneralCategory:
      uriBase + version + '/ucd/extracted/DerivedGeneralCategory.txt',
  };
  console.log('... ' + urls.idnaTestV2);
  console.log('... ' + urls.idnaMappingTable);
  console.log('... ' + urls.derivedGeneralCategory + '\n');

  const [infd, dgc] = await Promise.all([
    axios(urls.idnaMappingTable)
      .then((res) => res.data as string)
      .catch((err) => {
        console.error(err);
        throw err;
      }),
    axios(urls.derivedGeneralCategory)
      .then((res) => res.data as string)
      .catch((err) => {
        console.error(err);
        throw err;
      }),
    axios(urls.idnaTestV2)
      .then((res) => fs.writeFileSync('test/IdnaTest.txt', res.data))
      .catch((err) => {
        console.error(err);
        throw err;
      }),
  ]);
  await buildUnicodeMap(infd, dgc);
}

async function main() {
  const version = process.argv[2];
  if (!version) {
    throw new Error(
      'Expected unicode version but found none. Provide a version from https://www.unicode.org/Public/idna/',
    );
  }
  await downloadUnicode(version);
}

main();

function uniChar(i: number) {
  const char = String.fromCodePoint(i);
  return char;
}
function assert(condition: boolean, message = 'Assertion failed') {
  if (!condition) {
    throw new Error(message);
  }
}

/**
   * Parse each line to [start, end, fields] for the given Unicode data
file. These files are of the same basic format: a semicolon-delimited set
of columns, where the first column is either a single element or a range of
characters. In this case, the range implied by start and end are
inclusive.
   *
   *  */
function parseUnicodeDataFile(fd: string) {
  return (
    fd
      .split('\n')
      // remove all comments
      .map((line) => line.replace(/#.*/, ''))
      // remove blank lines
      .filter((line) => line !== '')
      .map((line) => {
        const parts = line.split(';').map((p) => p.trim());

        // convert hex to number
        let [start, end] = parts[0].split('..').map((num) => parseInt(num, 16));
        if (!end) {
          end = start;
        }
        return {
          start,
          end,
          parts: parts.slice(1),
        };
      })
  );
}

function utf16len(str: string) {
  let toReturn = str.split('').reduce((prev: number, curr: string) => {
    const next = curr.charCodeAt(0) > 0xffff ? 2 : 1;
    return prev + next;
  }, 0);
  return toReturn;
}

class MappedValue {
  flags: number;
  rule: string;
  chars: string;
  index: number;
  constructor(parts) {
    this.flags = 0;
    this.rule = parts[0].split(' ')[0];

    // If there are two parts, the second part is the mapping in question.
    if (parts.length > 1 && parts[1]) {
      this.chars = parts[1]
        .split(' ')
        .map((char) => {
          const parsed = parseInt(char, 16);
          return uniChar(parsed);
        })
        .join('');
    } else {
      this.chars = '';
    }

    /* In the case of disallowed_STD3_*, we process the real rule as the
     text following the last _, and set a flag noting to note the
     difference. */
    if (this.rule.startsWith('disallowed_STD3')) {
      this.flags |= 1;
      this.rule = this.rule.replace(/^.+_/i, ''); // this.rule.split('_').pop()
    }
  }
  buildMapString(str) {
    this.index = 0;
    if (this.chars) {
      this.index = str.indexOf(this.chars);
      if (this.index < 0) {
        this.index = utf16len(str);
        str = str + this.chars;
      } else {
        this.index = utf16len(str.slice(0, this.index));
      }
    }
    return str;
  }
  buildInt() {
    let status;
    switch (this.rule) {
      case 'disallowed':
        status = 0;
        break;
      case 'ignored':
      case 'mapped':
        status = 1; // We're mapping to a string of length 0
        break;
      case 'deviation':
        status = 2;
        break;
      case 'valid':
        status = 3;
        break;
      default:
        throw new Error('Unknown rule ' + this.rule);
    }

    // Sanity check all the bits
    assert(this.flags < 1 << 2, 'flags failed assertion: ' + this.flags);
    assert(this.index < 1 << 16, 'index failed assertion: ' + this.index);
    const numchars = utf16len(this.chars);
    assert(numchars < 1 << 5, 'numchars failed assertion: ' + numchars);

    return (this.flags << 23) | (status << 21) | (this.index << 5) | numchars;
  }
}

// The next two functions are helpers to find the block size that minimizes the
// total memory use. Notice that we're being clever in finding memory use by
// noting when we can use Uint8Array versus Uint32Array.
function findBlockSizes(unicharMap: any[]) {
  let toReturn: Array<{
    memUsage: number;
    lgBlockSize: number;
    blocks: any[];
  }> = [];
  for (let lgBlockSize = 1; lgBlockSize < 15; lgBlockSize++) {
    const blockSize = 1 << lgBlockSize;
    const { memUsage, blocks } = computeBlockSize(unicharMap, blockSize);
    toReturn.push({ memUsage, lgBlockSize, blocks });
  }
  return toReturn;
}

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

// function computeBlockSize
function computeBlockSize(unicharMap: any[], blockSize: number) {
  let blocks: Array<Array<any>> = [];
  for (let i = 0; i < unicharMap.length; i = i + blockSize) {
    const block = unicharMap.slice(i, i + blockSize);
    // if array is not in blocks, add it
    if (!blocks.some((b) => arrayEquals(block, b))) {
      // const index = blocks.findIndex((elem) => elem[0] > block[0]) || 0;
      // add to array but do-so in the same way that python would (ordered by numeric less than first)
      // blocks = arrayInsert(blocks, index, block);
      blocks.push(block);
    }
  }
  const num = blocks.length;
  let memUsage: number;
  if (num < 256) {
    memUsage = Math.floor(unicharMap.length / blockSize);
  } else if (num < 0x10000) {
    memUsage = Math.floor((2 * unicharMap.length) / blockSize);
  } else {
    throw new Error(`Way too many blocks: ${num}`);
  }
  memUsage += num * blockSize * 4;
  return { memUsage, blocks };
}
function escapeString(str: string) {
  const entityMap = {
    $: '$',
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": "'",
    '/': '/',
    // '\\': '\\',
    '`': '`',
    '=': '=',
  };
  return str.replace(/[$&<>"'`=\/]/g, function (s) {
    return `\\${entityMap[s]}`;
  });
}
function buildUnicodeMap(idnaMapTable: string, derivedGeneralCategory: string) {
  console.log('Build Unicode Map');
  let unicharMap: any[] = [];
  let vals: MappedValue[] = [];
  console.log('... parse unicode data file (IdnaMappingTable.txt)');
  parseUnicodeDataFile(idnaMapTable).forEach(({ start, end, parts }) => {
    for (let ch = start; ch <= end; ch++) {
      const value = new MappedValue(parts);
      vals.push(value);
      unicharMap[ch] = value;
    }
  });

  // Note which characters have the combining mark property.
  console.log('... parse unicode data file (DerivedGeneralCategory.txt)');
  parseUnicodeDataFile(derivedGeneralCategory).forEach(
    ({ start, end, parts }) => {
      if (
        ['Mc', 'Mn', 'Me'].some((substring) => parts[0].includes(substring))
      ) {
        for (let ch = start; ch <= end; ch++) {
          unicharMap[ch].flags |= 2;
        }
      }
    },
  );

  console.log('... build up internal unicharMap');
  // Build up the string to use to map the output
  // Python script was sorting here, but when sorting was removed, all tests still pass
  // vals = vals.sort(sortByLength);
  const mappedStr = vals.reduce((prev, val) => {
    return val.buildMapString(prev);
  }, '');

  // Convert this to integers
  unicharMap = unicharMap.map((val) => val.buildInt());

  // We're going to do a funky special case here. Since planes 3-17 are
  // basically unused, we're going to divert these from the standard two-phase
  // table lookup and use hardcoded JS for this code. Ensure that the values
  // are what we would write in the code.
  // (The special case here is that the variation selections, in plane 14, are
  // set to ignored, not disallowed).
  // UNICODE 15.0.0: disabled below special handling
  /*const specialCase = unicharMap[0xe0100];
  for (let ch = 0x3134b; ch < unicharMap.length; ch++) {
    assert(
      unicharMap[ch] === 0 ||
        (unicharMap[ch] === specialCase && 0xe0100 <= ch && ch <= 0xe01ef),
      'Special case in unicharMap failed: ' + ch,
    );
  }*/

  console.log('... generate source file (idna-map.js)');
  let blockSizes = findBlockSizes(unicharMap.slice(0, 0x3134b));

  blockSizes = blockSizes.sort((a, b) => a.memUsage - b.memUsage);

  const { memUsage, lgBlockSize, blocks } = blockSizes[0];
  const blockSize = 1 << lgBlockSize;

  let toWrite = `\/\* This file is generated from the Unicode IDNA table, using
the scripts/build-unicode-tables.ts script. Edit that
instead of this file. \*\/
// shorthand for Array.prototype.fill
let f = (e,t) => Array(t).fill(e);
// shorthand for Uint32Array
let a = (x) => new Uint32Array(x);
`;
  toWrite += stringifyBlocks(blocks as Array<Array<number>>);

  // Now emit the block index map
  let blockIndexes: number[] = [];
  for (let i = 0; i < 0x30000; i = i + blockSize) {
    const index = blocks.findIndex((b) => {
      const toReturn = arrayEquals(b, unicharMap.slice(i, i + blockSize));
      return toReturn;
    });
    blockIndexes.push(index);
  }
  toWrite += `   \nconst blockIndexes = new Uint${
    blocks.length < 256 ? 8 : 16
  }Array([${compressblockIndexes(blockIndexes)}]);\n`;

  toWrite += `const mapStr = '${escapeString(mappedStr)}';\n`;

  // Finish off with the function to actually look everything up
  const codepoint = unicharMap[0xe0100];
  const mask = (1 << lgBlockSize) - 1;
  toWrite += `function mapChar(codePoint) {
  if (codePoint >= 0x30000) {
    // High planes are special cased.
    if (codePoint >= 0xe0100 && codePoint <= 0xe01ef) return ${codepoint};
    return 0;
  }
  return blocks[blockIndexes[codePoint >> ${lgBlockSize}]][codePoint & ${mask}];
}

export { mapStr, mapChar };
`;
  fs.writeFileSync(IDNA_MAP_OUTPUT_PATH, toWrite);
}
