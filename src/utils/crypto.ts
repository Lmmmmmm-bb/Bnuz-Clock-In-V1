import Crypto from 'crypto-js'

const key = Crypto.enc.Utf8.parse('Your key')
const iv = Crypto.enc.Utf8.parse('Your iv')

const encrypt = (word: string): string => {
    const srcs = Crypto.enc.Utf8.parse(word)
    const encrypted = Crypto.AES.encrypt(srcs, key, {
        iv,
        mode: Crypto.mode.CBC,
        padding: Crypto.pad.Pkcs7
    })

    return encrypted.ciphertext.toString()
}

const decrypt = (word: string): string => {
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

export default {
    encrypt,
    decrypt
}
