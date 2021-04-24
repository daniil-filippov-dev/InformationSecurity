// ES5 require without ES6 import
const Blowfish = require("egoroof-blowfish");
const bf = new Blowfish("super key", Blowfish.MODE.ECB, Blowfish.PADDING.NULL); // only key isn't optional
bf.setIv("abcdefgh"); // optional for ECB mode; bytes length should be equal 8

const encoded = bf.encode("input text even with emoji 🎅");
const decoded = bf.decode(encoded, Blowfish.TYPE.STRING); // type is optional

console.log(`encoded: ${encoded}`);
console.log(`decoded: ${decoded}`);
