require("dotenv").config();
import { Request, Response } from "express";
import { Users, PrismaClient } from "@prisma/client";
import { logger } from "../Helpers/logger";
import { DecryptDataToJson, EncryptData } from "../services/encryption";
import { LoginReqI } from "./interface";
const { organisations } = new PrismaClient();

export const GetUserDetailsReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { email } = (await DecryptDataToJson(req.body)) as LoginReqI;
    const website = email.trim().split("@")[1];
    const name = website.split(".")[0];
    let detailResult = null;

    detailResult = await organisations.findFirst({
      where: {
        website,
        isActive: true,
        isDeleted: false,
      },
    });

    if (!detailResult)
      return res.status(404).send({
        errorMessage: "User does not exist",
        status: false,
      });

    const result = await EncryptData(detailResult);
    // req.session = result;

    //res.header('auth-token',token)
    return res.send({
      status: true,
      result,
    });
  } catch (er: any) {
    logger.error(er);
    res
      .status(500)
      .send({ errorMessage: er.message, status: false, result: null });
  }
};




export const GetAllUserDetailsReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);

    let detailResult = null;

    detailResult = await organisations.findMany({
      where: {
        isActive: true,
        isDeleted: false,
      },
    });

  

    const result = await EncryptData(detailResult);

    //res.header('auth-token',token)
    return res.send({
      status: true,
      result,
    });
  } catch (er: any) {
    logger.error(er);
    res
      .status(500)
      .send({ errorMessage: er.message, status: false, result: null });
  }
};

export const GetOrganisationDetailsReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { email } = (await DecryptDataToJson(req.body)) as LoginReqI;
    const website = email.trim().split("@")[1];
    const name = website.split(".")[0];
// let organName=email.split("@").length>1?email.split("@")[1]:"";
    let detailResult = null;

    detailResult = await organisations.findFirst({
      where: {
        // email: {
        //   endsWith: organName.trim(),
        // },
        website,
        isActive: true,
        isDeleted: false,
      },
    });

    if (!detailResult)
      return res.status(404).send({
        errorMessage: "Organisation does not exist",
        status: false,
      });

    const result = await EncryptData(detailResult);
    // req.session = result;

    //res.header('auth-token',token)
    return res.send({
      status: true,
      result,
    });
  } catch (er: any) {
    logger.error(er);
    res
      .status(500)
      .send({ errorMessage: er.message, status: false, result: null });
  }
};
