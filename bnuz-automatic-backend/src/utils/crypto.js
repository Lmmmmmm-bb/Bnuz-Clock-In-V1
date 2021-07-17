const Crypto = require('crypto-js')

const key = Crypto.enc.Utf8.parse('Your key')
const iv = Crypto.enc.Utf8.parse('Your iv')

const encrypt = word => {
    const srcs = Crypto.enc.Utf8.parse(word)
    const encrypted = Crypto.AES.encrypt(srcs, key, {
        iv,
        mode: Crypto.mode.CBC,
        padding: Crypto.pad.Pkcs7
    })

    return encrypted.ciphertext.toString()
}

const decrypt = word => {
    const encryptedHexStr = Crypto.enc.Hex.parse(word);
    const srcs = Crypto.enc.Base64.stringify(encryptedHexStr);
    const decrypt = Crypto.AES.decrypt(srcs, key, {
      iv,
      mode: Crypto.mode.CBC,
      padding: Crypto.pad.Pkcs7
    });
    const decryptedRes = decrypt.toString(Crypto.enc.Utf8);
    return decryptedRes.toString();
}

module.exports = {
    encrypt,
    decrypt
}
