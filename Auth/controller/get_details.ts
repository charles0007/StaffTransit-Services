const bcrypt = require("bcryptjs");
import { Request, Response } from "express";
import { Users, PrismaClient } from "@prisma/client";
import { logger } from "../Helpers/logger";

import { DecryptDataToJson, EncryptData } from "../services/encryption";
const { users, buses, organisations } = new PrismaClient();

export const GetOrganizationReq = async (
  req: Request,
  res: Response
) => {
  logger.info({ type: "encryped GetorCreateOrganizationReq", ...req.body });
  let details = null;
  try {
    const organizationReq = (await DecryptDataToJson(req.body)) as {
      email: string;
    };
    logger.info({
      type: "decryped GetorCreateOrganizationReq",
      ...organizationReq,
    });
    const website = organizationReq.email.split("@")[1];
    const name = website.split(".")[0];

    const websiteExist = await organisations.count({
      where: {website },
    });
    
    if (websiteExist) {
      details = organisations.findFirst({
        where: { website },
      });
    } else {
      
      details = null;
    }

    const result = await EncryptData({ status: true, details });
    return res.send(result);
  } catch (er: any) {
    logger.error(er);
    return res
      .status(500)
      .send({ status: false, error: "something went wrong, try again later" });
  }
};

export const GetBusReq = async (req: Request, res: Response) => {
  logger.info({ type: "encryped GetorCreateBusReq", ...req.body });
  let details = null;
  try {
    const busReq = (await DecryptDataToJson(req.body)) as {
      organisation_id: string;
      plateNumber: string;
      route;
    };
    logger.info({ type: "decryped GetorCreateBusReq", ...busReq });
    const plateNumber = busReq.plateNumber.trim().toUpperCase();
    const route = busReq.route?.trim().toUpperCase();

    const plateNumberExist = await buses.count({
      where: {         plateNumber: {contains:plateNumber.trim()},
 },
    });

    if (plateNumberExist) {
      details = buses.findFirst({
        where: {         plateNumber: {contains:plateNumber.trim()}
        , organisation_id: busReq.organisation_id },
      });
    } else {
      details = null;
    }

    const result = await EncryptData({ status: true, details });
    return res.send(result);
  } catch (er: any) {
    logger.error(er);
    return res
      .status(500)
      .send({ status: false, error: "something went wrong, try again later" });
  }
};
