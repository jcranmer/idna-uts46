const cfg = require('@hexonet/semantic-release-github-npm-config')
cfg.plugins.unshift(['@semantic-release/exec', {
  prepareCmd: 'npm run bundle && npm run minify'
}])
module.exports = cfg
