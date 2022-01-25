const CryptoJS = require('crypto-js');  //引用AES源码js


/**
 *
 * @param word
 * @param key
 * @param iv
 * @param mode
 * @param padding
 * @constructor
 */
function Decrypt(word: string, key: string, iv: string, mode: object, padding: object) {
  console.log(mode)
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs,
    key,
    {
      iv: iv,
      mode: mode,
      // mode: CryptoJS.mode.CBC,
      // padding: padding
      padding: CryptoJS.pad.Pkcs7
    });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

/**
 *
 * @param word
 * @param key
 * @param iv
 * @param mode
 * @param padding
 * @constructor
 */
function Encrypt(word: string, key: string, iv: string, mode: object, padding: object) {
  console.log(mode)
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs,
    key,
    {
      iv: iv,
      mode: mode,
      // mode: CryptoJS.mode.CBC,
      // padding:padding,
      // padding: padding
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.ciphertext.toString().toUpperCase();
}

export default {
  Decrypt,
  Encrypt
}
