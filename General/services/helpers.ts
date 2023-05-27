
const axios = require("axios");


const Helpers = {};

export const SendRequest = (
  method: string,
  url: string,
  data: any,
  headers: any
) => {
  return axios({ method, url, data, headers });
};



export const formatDateToString = (date: Date | null) => {
  var m = date == null ? new Date() : new Date(date);
  var dateString =
    m.getUTCFullYear() +
    "/" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) +
    "/" +
    ("0" + m.getUTCDate()).slice(-2) +
    " " +
    ("0" + m.getUTCHours()).slice(-2) +
    ":" +
    ("0" + m.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + m.getUTCSeconds()).slice(-2);

  return dateString;
};


export const getFormatedYYMMDD = (date: Date) => {
  let yyyy = date
    .getFullYear()
    .toString();
    //.substring(2);
  let MM = pad(date.getMonth() + 1, 2);
  let dd = pad(date.getDate(), 2);
  
  return yyyy+"-" + MM+"-" + dd ; // + mm + ss;
};



const YYMMDDHH = (date: Date) => {
  let yyyy = date
    .getFullYear()
    .toString()
    .substring(2);
  let MM = pad(date.getMonth() + 1, 2);
  let dd = pad(date.getDate(), 2);
  let hh = pad(date.getHours(), 2);
  // let mm = pad(date.getMinutes(), 2);
  // let ss = pad(date.getSeconds(), 2);

  return yyyy + MM + dd + hh; // + mm + ss;
};


export const getYYMMDDHH = () => {
  let d = new Date();
  return YYMMDDHH(d);
};
function pad(number: number, length: number) {
  let str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }

  return str;
}


// const d = new Date().toLocaleString({ timeZone: "UTC" });
// 5/28/2022, 5:54:28 PM
