import { Request, Response } from "express";
import { logger } from "../Helpers/logger";

export const Get = async (req: Request, res: Response) => {
  try {
    logger.info("just gett");
    return res.send("success");
  } catch (er) {
    return res.status(400).send(er);
  }
};
