## [5.0.7](https://github.com/hexonet/idna-uts46/compare/v5.0.6...v5.0.7) (2023-03-13)


### Performance Improvements

* **build:** improve build size again (1kb) ([8b12436](https://github.com/hexonet/idna-uts46/commit/8b12436052c799587c421ef0cfc11fbe420aab51))

## [5.0.6](https://github.com/hexonet/idna-uts46/compare/v5.0.5...v5.0.6) (2023-03-13)


### Performance Improvements

* **build:** minor improvement to file sizes of dist files ([19e61da](https://github.com/hexonet/idna-uts46/commit/19e61da7cd4e33e402456466de4cfe210dccf25d))

## [5.0.5](https://github.com/hexonet/idna-uts46/compare/v5.0.4...v5.0.5) (2023-03-10)


### Bug Fixes

* **esm:** switched to type module while CJS + Bundle can still be directly accessed via dist folder ([c3e1064](https://github.com/hexonet/idna-uts46/commit/c3e10644f6ef64ecd6fea00d609ae6d37f5b2d88))

## [5.0.4](https://github.com/hexonet/idna-uts46/compare/v5.0.3...v5.0.4) (2023-03-09)


### Bug Fixes

* **package.json:** fix path to main file ([77561b7](https://github.com/hexonet/idna-uts46/commit/77561b70d16fbab75ed40c3e3174b61cb56367cd))

## [5.0.3](https://github.com/hexonet/idna-uts46/compare/v5.0.2...v5.0.3) (2023-03-09)


### Bug Fixes

* **rollup:** merged config files ([05c22d8](https://github.com/hexonet/idna-uts46/commit/05c22d89615fc9d5af58c34cfb71722d30fcc222))

## [5.0.2](https://github.com/hexonet/idna-uts46/compare/v5.0.1...v5.0.2) (2023-03-09)


### Bug Fixes

* **build:** add missing devDependencies ([b3f692a](https://github.com/hexonet/idna-uts46/commit/b3f692a0f7dd5a80dac1b0ed0ab2647862bf03dd))
* **build:** added missing semantic-release configuration file and typings file ([bd3f43a](https://github.com/hexonet/idna-uts46/commit/bd3f43a8de68d5defe8245a7acf6d539e63799d7))
* **dist:** some minor review and cleanup of typings ([3fdff33](https://github.com/hexonet/idna-uts46/commit/3fdff33dd360c3ff48f4e91d9f0ced6e25c93409))

## [4.1.2](https://github.com/hexonet/idna-uts46/compare/v4.1.1...v4.1.2) (2022-12-09)


### Bug Fixes

* **unicode v15.0.0:** regenerated .js files (idna-map files were empty) ([cb00f51](https://github.com/hexonet/idna-uts46/commit/cb00f518d5fd781c82a510abd2ccff585303d137))

## [4.1.1](https://github.com/hexonet/idna-uts46/compare/v4.1.0...v4.1.1) (2022-12-09)


### Bug Fixes

* **code style:** prettier-ified ([e919514](https://github.com/hexonet/idna-uts46/commit/e919514bd95f349f045290b3c3834a860cb6fe32))

# [4.1.0](https://github.com/hexonet/idna-uts46/compare/v4.0.4...v4.1.0) (2022-12-09)


### Features

* **unicode v15:** upgrade ([5765785](https://github.com/hexonet/idna-uts46/commit/57657851359e5bbd48fa7ce62e6bfe38a9242834))

## [4.0.4](https://github.com/hexonet/idna-uts46/compare/v4.0.3...v4.0.4) (2022-09-14)


### Bug Fixes

* **punycode:** don't use the punycode module shipped with nodejs, read [#148](https://github.com/hexonet/idna-uts46/issues/148) ([78bfc91](https://github.com/hexonet/idna-uts46/commit/78bfc91525de27b633b338d672d9a3a334c6a51b))

## [4.0.3](https://github.com/hexonet/idna-uts46/compare/v4.0.2...v4.0.3) (2022-07-04)


### Performance Improvements

* **downsizing idna-map:** moving Uint32Array to const var for reuse and thus downsizing entire file ([da056b9](https://github.com/hexonet/idna-uts46/commit/da056b94736a1b87b55882ea4f9b64655d15122a))

## [4.0.2](https://github.com/hexonet/idna-uts46/compare/v4.0.1...v4.0.2) (2022-06-08)


### Bug Fixes

* **dep bump:** upgraded "engines" and dev deps ([1961f78](https://github.com/hexonet/idna-uts46/commit/1961f78fe9b365940318ad41be24d62759d305e3))

## [4.0.1](https://github.com/hexonet/idna-uts46/compare/v4.0.0...v4.0.1) (2022-06-08)


### Bug Fixes

* **github workflows:** fixed to always rely on latest node version number (nodejs/npm vuln) ([4e01d90](https://github.com/hexonet/idna-uts46/commit/4e01d90cd9f158d4111d8de8fd9257452895ff15))

# [4.0.0](https://github.com/hexonet/idna-uts46/compare/v3.5.0...v4.0.0) (2022-05-02)


### Bug Fixes

* **dep-bump:** added pkg "future" to requirements.txt until python2 support got totally cleaned up ([6610158](https://github.com/hexonet/idna-uts46/commit/66101588a592983e285616ca131ce948ede08695))
* **pep8:** fixed addressed issues ([f6e4acc](https://github.com/hexonet/idna-uts46/commit/f6e4accf06ab7e5bc2af71551fd19fe1f01386c4))


### chore

* **python3:** support added for generator script (build-unicode-tables.py) ([ead43c0](https://github.com/hexonet/idna-uts46/commit/ead43c06a4f1ebc6646009084c8962da12718398))


### BREAKING CHANGES

* **python3:** Module generated using the python3 ported generator script.

# [3.5.0](https://github.com/hexonet/idna-uts46/compare/v3.4.1...v3.5.0) (2022-05-02)


### Features

* **unicode 14.0.0:** upgraded, enjoy! ([4fec362](https://github.com/hexonet/idna-uts46/commit/4fec362a5c637ac95ad7e190538893e88d9064f4))

## [3.4.1](https://github.com/hexonet/idna-uts46/compare/v3.4.0...v3.4.1) (2022-04-29)


### Performance Improvements

* **bundled version:** minify idna-map.js and rely on it as well ([0b0ffc9](https://github.com/hexonet/idna-uts46/commit/0b0ffc97c2393a5e2414839b43bb247e0f1f8269))

# [3.4.0](https://github.com/hexonet/idna-uts46/compare/v3.3.1...v3.4.0) (2021-03-22)


### Features

* **unicode:** update to v13.0.0 ([2741d21](https://github.com/hexonet/idna-uts46/commit/2741d214012786ae5ac019abaa733f6a8399f89f))

## [3.3.1](https://github.com/hexonet/idna-uts46/compare/v3.3.0...v3.3.1) (2021-01-26)


### Bug Fixes

* **ci:** migration from Travis CI to github actions ([ebadb75](https://github.com/hexonet/idna-uts46/commit/ebadb759e0e6de8744daa5c0671fd48676a2f166))
* **ci:** remove --user flag for pip install ([8749327](https://github.com/hexonet/idna-uts46/commit/874932703364462466f86c5af4ee9692535ecc8a))


### Reverts

* **travis:** reverting change of travis-ci config ([8e804da](https://github.com/hexonet/idna-uts46/commit/8e804da0b50d63070436d01e9204a1718ee15cf6))

# [3.3.0](https://github.com/hexonet/idna-uts46/compare/v3.2.2...v3.3.0) (2020-05-18)


### Features

* **typescript:** adding type definitions ([8d0231f](https://github.com/hexonet/idna-uts46/commit/8d0231f1768da426322c4bab1cf8ae5f12555bf0))

## [3.2.2](https://github.com/hexonet/idna-uts46/compare/v3.2.1...v3.2.2) (2019-09-18)


### Bug Fixes

* **release process:** review git-plugin usage; dep-bump cross-env; ([0ec058a](https://github.com/hexonet/idna-uts46/commit/0ec058a))

## [3.2.1](https://github.com/hexonet/idna-uts46/compare/v3.2.0...v3.2.1) (2019-09-18)


### Bug Fixes

* **release process:** reuse @hexonet/semantic-release-github-npm-config ([46a3abb](https://github.com/hexonet/idna-uts46/commit/46a3abb))

# [3.2.0](https://github.com/hexonet/idna-uts46/compare/v3.1.1...v3.2.0) (2019-05-16)


### Features

* **unicode:** upgrade to v12.1.0 ([ee5877b](https://github.com/hexonet/idna-uts46/commit/ee5877b))

## [3.1.1](https://github.com/hexonet/idna-uts46/compare/v3.1.0...v3.1.1) (2019-05-13)


### Bug Fixes

* **docs:** fix documentation ([73423d1](https://github.com/hexonet/idna-uts46/commit/73423d1))
* **docs:** fix documentation ([adcf5a9](https://github.com/hexonet/idna-uts46/commit/adcf5a9))

# [3.1.0](https://github.com/hexonet/idna-uts46/compare/v3.0.0...v3.1.0) (2019-05-13)


### Bug Fixes

* **dep-add:** missing @semantic-release/exec in dev-deps ([35eb502](https://github.com/hexonet/idna-uts46/commit/35eb502))


### Features

* **uts46:** add convert method for automatic conversion of domain names ([84fcbe2](https://github.com/hexonet/idna-uts46/commit/84fcbe2))

# 3.0.0 (2019-04-15)

### Documentation

* **readme:** review links ([38e3533](https://github.com/hexonet/idna-uts46/commit/38e3533))

### Bug Fixes

* **pep8:** fix pep8 format check script ([464ffd4](https://github.com/hexonet/idna-uts46/commit/464ffd4))
* **travis:** fix build steps ([3f60010](https://github.com/hexonet/idna-uts46/commit/3f60010))
* **travis:** install python requirements in user space ([bda853a](https://github.com/hexonet/idna-uts46/commit/bda853a))
* **travis:** review build step requirements and docs ([f890546](https://github.com/hexonet/idna-uts46/commit/f890546))

### BREAKING CHANGES

* **readme:** just bumping major release as of CI/CD review in direction of Travis CI and semantic-release.

### Features

* **pkg:** upgrade to unicode 12.0.0; introduce travis ci ([ecfc57f](https://github.com/hexonet/idna-uts46/commit/ecfc57f))

### OLDER RELEASES (manually documented)

2017-11-06 / 2.3.0 - 2.3.1
==========================
* replaced for .. of loop in uts46.js on Line 111 with simple for loop. I don't expect this to break as no codepoint logic has to be payed heed to.

2017-04-18
==========
  * Switched automated tests to fit our own way
    * dropped out grunt
    * introduced nyc
    * introduced mocha.opts
    * npm test now runs both: tests and coverage report
    * add .nyc_output to gitignore
    * renamed test source code files to .spec.js as this is very common
  * re-validated source codes, still open: idna-map.js
  * updated .jshintrc config
  * added IDN translation cases found on unicode.org (see test-uts46.spec.js). Need to investigate further

2017-04-10
==========
Initial Fork Release covering:
  * dependenncy upgrades
    * chai 3.5.0
    * grunt 0.4.5 -> 1.0.1
    * grunt-mocha-istanbul 3.0.1 -> 5.0.2
    * grunt-mocha-test 0.12.7 -> 0.13.2
    * istanbul 0.3.22 -> 0.4.5
    * mocha 2.5.3 -> 3.2.0
    * punycode 1.4.1 -> 2.1.0
  * Added HISTORY.md (Changelog)
  * Upgraded IDNA Map to unicode 9.0.0
  * Updated README.md to cover: build-unicode-tables.py
  * Add test/IdnaTest.txt to gitignore as it get autogenerated
  * Re-validated test source scripts
