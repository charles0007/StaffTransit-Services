// import axios from "axios";
const axios = require("axios");
require("dotenv").config();

 export const SendNotification = (
  deviceToken: string,
  title: string,
  message: string
) => {
  try {
    if (deviceToken == null) return;
    console.log(deviceToken, title, message);
    const Url = "https://fcm.googleapis.com/fcm/send";
    const headers = {
      Authorization: process.env.FirebaseKey,
      "Content-Type": "application/json",
    };
    const data = {
      to: deviceToken,
      notification: {
        body: message,
        title,
      },
    };

    axios.post(Url, data, {
      headers,
    });
  } catch (error) {
    console.log("SendNotification error");
    console.log(error);
  }
  //console.log({headers, data});
};

// export default SendNotification;