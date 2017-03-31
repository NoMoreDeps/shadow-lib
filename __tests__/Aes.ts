import * as ShadowLib from "../Index";
import AES = ShadowLib.Crypto.AES;

let originalPhrase = "foo bar !!";
let password = "MyPass";
let wrongPassword = "MyWrongPass";
let aes = new AES();

describe("Aes test", () => {
  it("Should encode and decode in 128 bits", () => {
    let encoded = aes.to128(originalPhrase, password);
    let decoded = aes.from128(encoded, password);
    let wrongDecode = aes.from128(encoded, wrongPassword);

    expect(decoded).toEqual(originalPhrase);
    expect(wrongDecode).not.toEqual(originalPhrase);
  });

  it("Should encode and decode in 192 bits", () => {
    let encoded = aes.to192(originalPhrase, password);
    let decoded = aes.from192(encoded, password);
    let wrongDecode = aes.from192(encoded, wrongPassword);

    expect(decoded).toEqual(originalPhrase);
    expect(wrongDecode).not.toEqual(originalPhrase);
  });

  it("Should encode and decode in 256 bits", () => {
    let encoded = aes.to256(originalPhrase, password);
    let decoded = aes.from256(encoded, password);
    let wrongDecode = aes.from256(encoded, wrongPassword);

    expect(decoded).toEqual(originalPhrase);
    expect(wrongDecode).not.toEqual(originalPhrase);
  });

  it("Should work 3000 times", () => {
    for (let i = 0; i < 1000; i++) {
      let encoded = aes.to128(originalPhrase, password);
      let decoded = aes.from128(encoded, password);
      let wrongDecode = aes.from128(encoded, wrongPassword);
    }

    for (let i = 0; i < 1000; i++) {
      let encoded = aes.to192(originalPhrase, password);
      let decoded = aes.from192(encoded, password);
      let wrongDecode = aes.from192(encoded, wrongPassword);
    }

    for (let i = 0; i < 1000; i++) {
      let encoded = aes.to256(originalPhrase, password);
      let decoded = aes.from256(encoded, password);
      let wrongDecode = aes.from256(encoded, wrongPassword);
    }
  });
});

