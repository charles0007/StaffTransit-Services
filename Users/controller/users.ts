require("dotenv").config();
import { Request, Response } from "express";
import { Users, PrismaClient } from "@prisma/client";
import { logger } from "../Helpers/logger";
import { DecryptDataToJson, EncryptData } from "../services/encryption";
import { LoginReqI } from "./interface";
const { users } = new PrismaClient();

export const GetUserDetailsReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { email } = (await DecryptDataToJson(req.body)) as LoginReqI;

    let detailResult = null;

    detailResult = await users.findFirst({
      where: {
        email: email.trim(),
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

export const GetAllUserDetailsByOrganisationReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { organisation_id } = (await DecryptDataToJson(req.body)) as {organisation_id:string};

    let detailResult = null;

    detailResult = await users.findMany({
      where: {
        organisation_id,
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


export const GetAllUserDetailsReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);

    let detailResult = null;

    detailResult = await users.findMany({
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
