const cfg = require('@hexonet/semantic-release-github-npm-config');
cfg.plugins.unshift([
  '@semantic-release/exec',
  {
    prepareCmd: 'npm run build && npx lint-staged',
  },
]);
cfg.plugins = cfg.plugins.map((plugin) => {
  if (plugin[0] === '@semantic-release/git') {
    plugin[1].assets.push('dist/index.d.ts', 'dist/index.mjs');
  }
  return plugin;
});
module.exports = cfg;
