/**
 * Created by Kenny on 4/26/17.
 */

const CryptoJS = require('crypto-js');
//Get config
const appConfig = require('../config/app-config.json');

module.exports = {
// SHA2: ENCRYPT
  encrypt: function(password, secret) {

    // generate 256 bit salt
    var salt = CryptoJS.lib.WordArray.random(256 / 8);

    // generate derived key from password using SHA256, 10 iterations
    var key = CryptoJS.PBKDF2(secret, salt, {iterations: 10, hasher: CryptoJS.algo.SHA256});

    // generate 128 bit IV
    var iv = CryptoJS.lib.WordArray.random(128 / 8);

    // key is already in WordArray format, so custom IV accepted
    var encrypted = CryptoJS.AES.encrypt(password, key, {iv: iv});

    // cipher parameters to be returned. Encoded for storage
    var cipher = {};

    // encode cipher text into base46
    cipher.ciphertext = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    // encode salt and iv to string representing hexedecimal
    cipher.salt = CryptoJS.enc.Hex.stringify(salt);
    cipher.iv = CryptoJS.enc.Hex.stringify(iv);

    // generate HMAC
    var key_str = CryptoJS.enc.Hex.stringify(key);
    var HMAC = CryptoJS.HmacSHA256(cipher.ciphertext + cipher.iv, key_str);
    cipher.HMAC = CryptoJS.enc.Hex.stringify(HMAC);

    return cipher;
  },
  // SHA2: DECRYPT
  decrypt: function(cipher, password) {

    // decode iv and salt from string to type WordArray
    var iv = CryptoJS.enc.Hex.parse(cipher.iv);
    var salt = CryptoJS.enc.Hex.parse(cipher.salt);

    // generate derived key from password using SHA256, 10 iterations
    var key = CryptoJS.PBKDF2(password, salt, {iterations: 10, hasher: CryptoJS.algo.SHA256});

    // decode cipher text from base64 string to WordArray
    var ciphertext = CryptoJS.enc.Base64.parse(cipher.ciphertext);

    // calculate HMAC
    var key_str = CryptoJS.enc.Hex.stringify(key);
    var HMAC = CryptoJS.HmacSHA256(cipher.ciphertext + cipher.iv, key_str);
    var HMAC_str = CryptoJS.enc.Hex.stringify(HMAC);

    // compare HMACs
    if (HMAC_str !== cipher.HMAC) {
      return;
    }

    var _cp = CryptoJS.lib.CipherParams.create({
      ciphertext: ciphertext
    });

    var decrypted = CryptoJS.AES.decrypt(_cp, key, {iv: iv});

    return decrypted.toString(CryptoJS.enc.Utf8);
  },
  processArgs: function() {
    //Get all command line args (current options are -env <prod,qa,dev> and -logging off
    var args = {};
    for (var i = 0; i < process.argv.length; i++) {
      if (process.argv[i] === '-env') {
        args.env = process.argv[i + 1];
      }
      if (process.argv[i] === '-logging') {
        args.logging = process.argv[i + 1];
      }
    }
    return args;
  },
  getEnvConfig: function() {
    const processArgs = this.processArgs();
    const env = processArgs.env;
    if (env === 'dev') {
      envConfig = appConfig.dev;
    }
    else if (env === 'qa') {
      envConfig = appConfig.qa;
    }
    else if (env === 'prod') {
      envConfig = appConfig.prod;
    }
    else {
      envConfig = appConfig.dev;
    }
    return envConfig;
  }
};
