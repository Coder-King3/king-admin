import CryptoJS from 'crypto-js'

type WordArray = CryptoJS.lib.WordArray

/**
 * * 加解密类 *
 * @class Crypto
 * @param {WordArray} secretKey
 * @param {object} cryptoConfig
 */
class Crypto {
  private cryptoConfig: object
  private readonly secretKey: WordArray

  constructor(secretKey: string, cryptoConfig: object) {
    this.secretKey = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(secretKey))
    this.cryptoConfig = cryptoConfig
  }

  /**
   * * 加密 *
   *  @function encrypt
   * @param {string} plainText
   * @return {string}
   * @memberof Crypto
   */
  encrypt(plainText: string) {
    const pt = CryptoJS.enc.Utf8.parse(plainText)
    const encrypted = CryptoJS.AES.encrypt(
      pt,
      this.secretKey,
      this.cryptoConfig
    ).toString()
    return encrypted
  }

  /**
   * * 解密 *
   * @function decrypt
   * @param {string} cipherText
   * @return {string}
   * @memberof Crypto
   */
  decrypt(cipherText: string) {
    const ct = cipherText
    const decrypted = CryptoJS.AES.decrypt(
      ct,
      this.secretKey,
      this.cryptoConfig
    ).toString(CryptoJS.enc.Utf8)
    return decrypted
  }

  /**
   * * MD5加密 *
   * @function MD5
   * @param {string} plainText
   * @return {string}
   * @memberof Crypto
   */
  MD5(plainText: string) {
    const pt = plainText
    const encrypted = CryptoJS.MD5(pt)
    return encrypted
  }
}

export const crypto = new Crypto('King3', {
  iv: [],
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
})
