var assert = require("assert");
var uts46 = require("../uts46");

suite('toASCII', function () {
  test('Basic tests', function () {
    assert.equal(uts46.toAscii("öbb.at"), "xn--bb-eka.at");
    assert.equal(uts46.toAscii("xn--bb-eka.at"), "xn--bb-eka.at");
    assert.equal(uts46.toAscii("XN--BB-EKA.AT"), "xn--bb-eka.at");
    assert.equal(uts46.toAscii("faß.de", {transitional: true}), "fass.de");
    assert.equal(uts46.toAscii("faß.de", {transitional: false}), "xn--fa-hia.de");
    assert.equal(uts46.toAscii("xn--fa-hia.de", {transitional: true}), "xn--fa-hia.de");
    // Default to not processing STD3 rules (that's what URL.domainToASCII
    // is specifying).
    assert.equal(uts46.toAscii("not=std3"), "not=std3");
    assert.throws(function () {
      uts46.toAscii("not=std3", { useStd3ASCII: true });
    });
    assert.throws(function () {uts46.toAscii(String.fromCodePoint(0xd0000)); });

    // Check verify DNS length
    assert.equal(uts46.toAscii("", { verifyDnsLength: false }), "");
    assert.throws(function () { uts46.toAscii("", { verifyDnsLength: true }) });
  });
  test('Verify DNS length parameter', function () {
    assert.throws(function () {
      uts46.toAscii("this..is.almost.right", { verifyDnsLength: true })
    });
    assert.throws(function () {
      uts46.toAscii("a.".repeat(252 / 2) + "aa", { verifyDnsLength: true })
    });
    assert.doesNotThrow(function () {
      // Exactly 253 characters.
      uts46.toAscii("a.".repeat(252 / 2) + "a", { verifyDnsLength: true })
    });
    assert.throws(function () {
      uts46.toAscii("a".repeat(64), { verifyDnsLength: true });
    });
    assert.doesNotThrow(function () {
      uts46.toAscii("a".repeat(63), { verifyDnsLength: true });
    });
    // Default is to not verify it.
    assert.equal(uts46.toAscii(""), "");
  });
  test('Defaults to transitional', function () {
    assert.equal("fass.de", uts46.toAscii("faß.de"));
  });
  test('Non-BMP characters', function () {
    assert.equal(uts46.toAscii("\ud83d\udca9"), "xn--ls8h");
    // This non-BMP character gets mapped to another non-BMP character.
    assert.equal(uts46.toAscii("\ud87e\udcca"), "xn--w60j");
    // ... and let's throw in a variant selector before it (which gets ignored)!
    assert.equal(uts46.toAscii("\udb40\udd00\ud87e\udcca"), "xn--w60j");
  });
});

suite('toUnicode', function () {
  test('Basic tests', function () {
    assert.equal(uts46.toUnicode("öbb.at"), "öbb.at");
    assert.equal(uts46.toUnicode("Öbb.at"), "öbb.at");
    assert.equal(uts46.toUnicode("O\u0308bb.at"), "öbb.at");
    assert.equal(uts46.toUnicode("xn--bb-eka.at"), "öbb.at");
    assert.equal(uts46.toUnicode("faß.de"), "faß.de");
    assert.equal(uts46.toUnicode("fass.de"), "fass.de");
    assert.equal(uts46.toUnicode("xn--fa-hia.de"), "faß.de");
    // Default to not processing STD3 rules (that's what URL.domainToASCII
    // is specifying).
    assert.equal(uts46.toUnicode("not=std3"), "not=std3");
    assert.throws(function () {
      uts46.toUnicode("not=std3", { useStd3ASCII: true });
    });
    assert.throws(function () {uts46.toUnicode(String.fromCodePoint(0xd0000)); });
  });
  test('Non-BMP characters', function () {
    assert.equal(uts46.toUnicode("\ud83d\udca9"), "\ud83d\udca9");
    // This non-BMP character gets mapped to another non-BMP character.
    assert.equal(uts46.toUnicode("\ud87e\udcca"), "\ud84c\udc0a");
    // ... and let's throw in a variant selector before it (which gets ignored)!
    assert.equal(uts46.toUnicode("\udb40\udd00\ud87e\udcca"), "\ud84c\udc0a");
  });
});
