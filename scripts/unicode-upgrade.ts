import pckjson from '../package.json' assert { type: 'json' };
import fs from 'fs';

async function getLatestUnicodeVersion() {
  let response;
  try {
    response = await fetch('https://www.unicode.org/versions/latest/', {
      method: 'GET',
    });
  } catch (error) {
    console.error('Unable to fetch latest unicode version.');
    return Promise.reject({ version: null });
  }
  const latestVersion = response.url.replace(/(^.+Unicode|\/?$)/g, '');
  console.log(`Latest unicode version ${latestVersion} detected.`);
  return Promise.resolve({
    version: latestVersion,
  });
}

async function main() {
  const filename = 'package.json';
  const response = await getLatestUnicodeVersion();
  const latestVersion = response.version;
  if (!latestVersion) {
    process.exit(-1);
  }

  if (latestVersion === pckjson.unicodeVersion) {
    console.log('Latest unicode version already in use.');
    process.exit(0);
  }

  pckjson.unicodeVersion = latestVersion;
  pckjson.scripts[
    'build:unicode-tables'
  ] = `esr scripts/build-unicode-tables.ts ${latestVersion}`;

  fs.writeFile(
    filename,
    JSON.stringify(pckjson, null, 2),
    'utf8',
    function (err) {
      if (err) {
        console.error(
          'An error occured while writing the package.json. ' + err.message,
        );
        process.exit(-1);
      } else {
        console.log('package.json has been updated to latest unicode version.');
        process.exit(0);
      }
    },
  );
}

main();
