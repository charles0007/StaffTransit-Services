require("dotenv").config();
import { Request, Response } from "express";
import {  PrismaClient } from "@prisma/client";
import { logger } from "../Helpers/logger";
import { DecryptDataToJson, EncryptData } from "../services/encryption";
import { LoginReqI } from "./interface";
const { buses } = new PrismaClient();

export const GetBusDetailsByPlateReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { plateNumber,organisation_id } = (await DecryptDataToJson(req.body)) as {plateNumber:string,organisation_id:string};

    let detailResult = null;

    detailResult = await buses.findMany({
      where: {
        plateNumber: {contains:plateNumber.trim()},
        organisation_id,
        isActive: true,
        isDeleted: false,
      },
    });

    if (!detailResult)
      return res.status(404).send({
        errorMessage: "Bus does not exist",
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

export const GetAllBusDetailsByOrganisationReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { organisation_id } = (await DecryptDataToJson(req.body)) as {organisation_id:string};

    let detailResult = null;

    detailResult = await buses.findMany({
      where: {
        organisation_id: organisation_id.trim(),
        isActive: true,
        isDeleted: false,
      },
    });

    if (!detailResult)
      return res.status(404).send({
        errorMessage: "No Bus exist in this organization",
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


export const GetAllBusDetailsReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);

    let detailResult = null;

    detailResult = await buses.findMany({
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
