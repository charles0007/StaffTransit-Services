import { get } from "lodash";
const bcrypt = require("bcryptjs");
import { logger } from "../Helpers/logger";
import { tokenValidation } from "./schema/validation";
import { Request, Response, NextFunction } from "express";
import { DecryptDataToString } from "../services/encryption";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const authSession = get(req, "session");
  logger.info(authSession);
  if (!authSession) {
    return res.sendStatus(403);
  } else {
    try {
      const decryptedData = await DecryptDataToString(authSession);
      const { error } = tokenValidation(decryptedData);
      if (error)
        return res.status(401).send({
          errorMessage: "UnAuthorized User",
          message: error.details[0].message,
          status: false,
        });
    } catch (er) {
        logger.error(er);
      return res.status(500).send({
        errorMessage: "UnAuthorized User",
        message: er.message,
        status: false,
      });
    }
  }
  return next();
};

export default requireUser;
