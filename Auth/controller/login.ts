const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import { Users, PrismaClient } from "@prisma/client";
import { logger } from "../Helpers/logger";
import { loginValidation } from "../middleware/schema/validation";
import { DecryptDataToJson, EncryptData } from "../services/encryption";
import { BusData, LoginReqI, OrganizationData, UserData } from "./interface";
const { users, buses, organisations } = new PrismaClient();

export const LoginUserReq = async (req: any, res: Response) => {
  try {
    logger.info(req.body);
    const { email, password, deviceToken } = (await DecryptDataToJson(
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
        errorMessage: "Email or password is incorect",
        status: false,
      });
    if (deviceToken != "") {
      await users.update({
        where: { Id: detailResult.Id },
        data: {
          deviceToken,
        },
      });
    }

 
    if (req.session) {
      // Set the session data using req.session
      req.session.detailResult = await EncryptData(detailResult);

      // Update the session using req.session.touch()
      req.session.touch();
    }

    
    const result=await EncryptData({ status: true, detailResult });
       return res.send(result);
  } catch (er: any) {
    logger.error(JSON.stringify(er));
    // res.status(400).send({ errorMessage: er.message, status: false });
    res.status(500).send({ status: false,error:"something went wrong, try again later" });

  }
};
