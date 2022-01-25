const CryptoJS = require('crypto-js');  //引用AES源码js


//解密方法
function Decrypt(word: string, key: string, iv: string, model: object, padding: object) {
  console.log(model)
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs,
    key,
    {
      iv: iv,
      mode: model,
      // padding: padding
      padding: CryptoJS.pad.Pkcs7
    });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//加密方法
function Encrypt(word: string, key: string, iv: string, model: object, padding: object) {
  console.log(model)
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs,
    key,
    {
      iv: iv,
      mode: model,
      // padding: padding
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.ciphertext.toString().toUpperCase();
}

export default {
  Decrypt,
  Encrypt
}
