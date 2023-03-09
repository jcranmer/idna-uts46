# IDNA-UTS #46 in JavaScript

[![npm version](https://img.shields.io/npm/v/idna-uts46-hx.svg?style=flat)](https://www.npmjs.com/package/idna-uts46-hx)
[![node](https://img.shields.io/node/v/idna-uts46-hx.svg)](https://www.npmjs.com/package/idna-uts46-hx)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hexonet/idna-uts46/blob/master/CONTRIBUTING.md)

This module is a IDNA UTS46 connector library for javascript.
This is a maintained fork of the idna-uts46 library originally written by jcranmer. Continously maintained by KaiSchwarz-cnic and fully ported to JS by dawsbot.

The [JS Punycode converter library](https://github.com/bestiejs/punycode.js/) is
a great tool for handling Unicode domain names, but it only implements the
Punycode encoding of domain labels, not the full IDNA algorithm. In simple
cases, a mere conversion to lowercase text before input would seem sufficient,
but the real mapping for strings is far more complex. This library implements
the full mapping for these strings, as defined by
[UTS #46](http://unicode.org/reports/tr46/).

## Resources

- [Documentation](https://centralnicgroup-public.github.io/rtldev-middleware-documentation/docs/hexonet/idna-uts46/)
- [Release Notes](https://github.com/hexonet/idna-uts46/releases)

## Authors

NOTE: As mentioned, initial work done by [jcranmer](https://github.com/jcranmer).

- [KaiSchwarz-cnic](https://github.com/kaischwarz-cnic)
- [dawsbot](https://github.com/dawsbot)

See also the list of [contributors](https://github.com/hexonet/idna-uts46/graphs/contributors) who participated in this project.

## License

MIT
