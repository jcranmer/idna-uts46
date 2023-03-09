const fs = require('fs');

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

  let json = require('../' + filename);
  if (latestVersion === json.unicodeVersion) {
    console.log('Latest unicode version already in use.');
    process.exit(0);
  }

  json.unicodeVersion = latestVersion;
  json.scripts[
    'build:unicode-tables'
  ] = `esr scripts/build-unicode-tables.ts ${latestVersion}`;

  fs.writeFile(filename, JSON.stringify(json, null, 2), 'utf8', function (err) {
    if (err) {
      console.error(
        'An error occured while writing the package.json. ' + err.message,
      );
      process.exit(-1);
    } else {
      console.log('package.json has been updated to latest unicode version.');
      process.exit(0);
    }
  });
}

main();
