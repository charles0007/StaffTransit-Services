const bcrypt = require("bcryptjs");
require("dotenv").config();
import { Request, Response } from "express";
import {randomUUID} from "crypto-js";
import { v4 as uuidv4 } from 'uuid';
import { Users, PrismaClient } from "@prisma/client";
import { logger } from "../Helpers/logger";
import { loginValidation } from "../middleware/schema/validation";
import { DecryptDataToJson, EncryptData } from "../services/encryption";
import { BusData, LoginReqI, OrganizationData, UserData } from "./interface";
import { sendValidationEmail } from "../services/email_validation";
const { users, buses, organisations } = new PrismaClient();



export const SendTokenReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { email } = (await DecryptDataToJson(
      req.body
    )) as {email:string};
  
 

    const token=uuidv4().split("-")[0].toUpperCase();
    console.log({token})
    sendValidationEmail(email,token);
 
    await users.upsert({
      where: {
        email: email.trim(),
      },
      create:{email:email.trim(),bus_id:"general",organisation_id:"general",token},
      update:{
        email:email.trim(),token
      }
      
      
    })
   
    const result=await EncryptData({ status: true, email });
       return res.send(result);
  } catch (er: any) {
    console.log(er)
    logger.error(JSON.stringify(er));
    // res.status(400).send({ errorMessage: er.message, status: false });
    res.status(500).send({ status: false,error:"something went wrong, try again later" });

  }
};


export const VerifyTokenReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { email, token } = (await DecryptDataToJson(
      req.body
    )) as {email:string,token:string};

  
    let detailResult = null;

    detailResult = await users.findFirst({
      where: {
        email: email.trim(),
       token
      },
      select: {email:true,token:true},
    });

    if (!detailResult)
      return res.status(401).send({
        errorMessage: "Token Invalid",
        status: false,
      });

  


    
    const result=await EncryptData({ status: true, detailResult });
       return res.send(result);
  } catch (er: any) {
    logger.error(JSON.stringify(er));
    // res.status(400).send({ errorMessage: er.message, status: false });
    res.status(500).send({ status: false,error:"something went wrong, try again later" });

  }
};

export const VerifyPasswordReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { email, password } = (await DecryptDataToJson(
      req.body
    )) as LoginReqI;
    const { error } = loginValidation({ email, password });

    if (error)
      return res.status(400).send({
        errorMessage: error.details[0].message,
        status: false,
      });
    let detailResult = null;

    detailResult = await users.findFirst({
      where: {
        email: email.trim(),
        isActive: true,
        isDeleted: false,
      },
      select: UserData,
    });

    if (!detailResult)
      return res.status(409).send({
        errorMessage: "User does not exist",
        status: false,
      });

    const validPass = await bcrypt.compare(password, detailResult.password);

    if (!validPass)
      return res.status(401).send({
        errorMessage: "password is incorect",
        status: false,
      });
  


    
    const result=await EncryptData({ status: true, detailResult });
       return res.send(result);
  } catch (er: any) {
    logger.error(JSON.stringify(er));
    // res.status(400).send({ errorMessage: er.message, status: false });
    res.status(500).send({ status: false,error:"something went wrong, try again later" });

  }
};