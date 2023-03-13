// although minifiers are able to replace variable names with short alphabet letters,
// this package benefits most from numbers inside the arrays being deduplicated
// dynamic var names prefixed with `v` are used to deduplicate the numbers.
// Note that "f" is used for a shorthand of Array.prototype.fill and thus is not found here

export const compressblockIndexes = (blockIndexes: number[]): string => {
  let toReturn = `${blockIndexes.toString()},`;
  let startIndex = 0;
  let streakLength = 1;
  let lastBlockIndex: number = 0;
  let streakNumber = blockIndexes[0]; // the number which is repeated in the original array
  blockIndexes.forEach((blockIndex, i) => {
    if (i === 0) return;
    if (blockIndex === lastBlockIndex && i < blockIndexes.length - 1) {
      // streak continues
      streakLength++;
    } else {
      // streak ends
      const toReplace = `,${blockIndexes.slice(startIndex, i).toString()},`;
      const replaceWith = `,...f(${streakNumber},${streakLength}),`;
      // if array fill text is shorter than what was there, replace it
      if (replaceWith.length < toReplace.length + 2) {
        toReturn = toReturn.replace(toReplace, replaceWith);
      }

      startIndex = i;
      streakNumber = blockIndex;
      streakLength = 1;
    }

    lastBlockIndex = blockIndex;
  });
  return toReturn;
};

export const stringifyBlocks = (blocks: Array<Array<number>>) => {
  const freq: Record<string, number> = {};
  blocks.forEach((block) => {
    block.forEach((elem) => {
      freq[elem] = (freq[elem] || 0) + 1;
    });
  });
  let stringifiedArr = blocks
    .map((block) => `a([${block.toString()}])`)
    .join(',');

  const toReplace = Object.entries(freq)
    .filter(([elem, freq]) => freq > 11) // lowest size up to now
    .filter(([elem, freq]) => String(elem).length > 1)
    .sort(([, freq1], [, freq2]) => freq2 - freq1);

  const blocked = ['a', 'f']; // special functions see build-unicode-tables.ts
  const alpha1 = Array.from(Array(26)).map((e, i) =>
    String.fromCharCode(i + 65),
  );
  const alpha2 = Array.from(Array(26))
    .map((e, i) => String.fromCharCode(i + 97))
    .filter((x) => !blocked.includes(x));

  const alphabet = [
    ...alpha1,
    ...alpha2,
    ...alpha1.map((x) => x + x),
    ...alpha2.map((x) => x + x),
  ];

  let pre = 'let ';
  toReplace.forEach(([elem, freq], i) => {
    const letter = alphabet[i];
    pre += `${letter}=${elem},`;
    const strToReplace = `([^0-9])${elem}([^0-9])`;
    const regex = new RegExp(strToReplace, 'g');
    while (stringifiedArr.match(regex)) {
      stringifiedArr = stringifiedArr.replace(regex, `$1${letter}$2`);
    }
  });
  return `${pre.slice(0, -1)};\nconst blocks = [${stringifiedArr}];\n`;
};
