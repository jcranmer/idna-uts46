import pckjson from '../package.json' assert { type: 'json' };

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
  const response = await getLatestUnicodeVersion();
  const latestVersion = response.version;
  if (!latestVersion) {
    process.exit(0);
  }

  if (latestVersion === pckjson.unicodeVersion) {
    console.log('Latest unicode version already in use.');
    process.exit(0);
  }

  console.log(`Latest unicode version not in use.`);
  process.exit(-1);
}

main();
