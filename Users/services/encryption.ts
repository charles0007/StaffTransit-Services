const CryptoJS = require("crypto-js");

const ivr = process.env.IV as string;
const keyr = process.env.KEY as string;
const ivt = ascii_to_hexa(ivr);
const keyt = ascii_to_hexa(keyr);

const key = CryptoJS.enc.Hex.parse(keyt);

const iv = CryptoJS.enc.Hex.parse(ivt);

function ascii_to_hexa(str: string) {
  let arr1 = [];
  for (let n = 0, l = str.length; n < l; n++) {
    let hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
}

export const EncryptData = async (data: any) => {
  const encryptedData = await CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
  }).ciphertext.toString(CryptoJS.enc.Hex);

  return encryptedData;
};

export const DecryptDataToString = async (data: any) => {
  const dencryptedData = await CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    format: CryptoJS.format.Hex,
  }).toString(CryptoJS.enc.Utf8);

  return dencryptedData;
};

export const DecryptDataToJson = async (data: any) => {
  const dencryptedData = await CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    format: CryptoJS.format.Hex,
  }).toString(CryptoJS.enc.Utf8);

  return JSON.parse(dencryptedData);
};
