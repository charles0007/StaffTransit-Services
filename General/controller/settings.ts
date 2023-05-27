const bcrypt = require("bcryptjs");
require("dotenv").config();
import { Request, Response } from "express";

import { Users, PrismaClient } from "@prisma/client";
import { logger } from "../Helpers/logger";
import { DecryptDataToJson, EncryptData } from "../services/encryption";

const { users, buses, organisations } = new PrismaClient();



export const ShareLocationReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { shareLocation,email } = (await DecryptDataToJson(
      req.body
    )) as {shareLocation:boolean,email:string};
  
 

 
    await users.update({
      where: {
        email: email.trim(),
      },
      data:{
        shareLocation
      }
      
      
    })
   
    const result=await EncryptData({ status: true, email,shareLocation });
       return res.send(result);
  } catch (er: any) {
    console.log(er)
    logger.error(JSON.stringify(er));
    // res.status(400).send({ errorMessage: er.message, status: false });
    res.status(500).send({ status: false,error:"something went wrong, try again later" });

  }
};

export const SendNotificationReq = async (req: any, res: Response) => {
    try {
      logger.info(req.body);
      const { notification,email } = (await DecryptDataToJson(
        req.body
      )) as {notification:boolean,email:string};
    
   
  
   
      await users.update({
        where: {
          email: email.trim(),
        },
        data:{
            notification
        }
        
        
      })
     
      const result=await EncryptData({ status: true, email,notification });
         return res.send(result);
    } catch (er: any) {
      console.log(er)
      logger.error(JSON.stringify(er));
      // res.status(400).send({ errorMessage: er.message, status: false });
      res.status(500).send({ status: false,error:"something went wrong, try again later" });
  
    }
  };