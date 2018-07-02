/**
 * @disc:加密
 * @author:yanxinaliang
 * @time：2017/10/27 18:05
 */
const AES = require("crypto-js/aes");
const Utf8 = require("crypto-js/enc-utf8");
const ModeECB = require("crypto-js/mode-ecb");
const ZeroPadding = require("crypto-js/pad-zeropadding");
const MD5 = require("crypto-js/md5");
const CryptoBase64 = require("crypto-js/enc-base64");

class Crypto{
    public static encrypt(data:string,key:string){
        const config={
            mode : ModeECB,
            padding : ZeroPadding,
            iv:Utf8.parse(MD5(key).toString()),
        };
        return AES.encrypt(data,key,config).toString();
    }
    public static decrypt(cipherText:string,key:string){
        const config={
            mode : ModeECB,
            padding : ZeroPadding,
            iv:Utf8.parse(MD5(key).toString()),
        };
        return AES.decrypt(cipherText,key,config).toString(Utf8);
    }
}

class Base64Util{
    static stringify(word:string){
        return  encodeURIComponent(CryptoBase64.stringify(Utf8.parse(word)));
    }
    static parse(base64:string){
        return  CryptoBase64.parse(decodeURIComponent(base64)).toString(Utf8);
    }
}

export {Crypto,Base64Util};