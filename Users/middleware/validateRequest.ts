import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import { logger } from "../Helpers/logger";
import { DecryptDataToString, EncryptData } from "../services/encryption";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: await DecryptDataToString(req.body),
        query: await DecryptDataToString(req.query),
        params: await DecryptDataToString(req.params),
      });
      return next();
    } catch (er: any) {
      logger.error(er);
      let error=null;
      if (er?.value?.body === null) {

        error=await EncryptData({error:"Invalid format"});
       // console.log(error)
        return res.status(403).send(error);
      }
      error= await EncryptData({error:er.message});
     // console.log(error)

      return res.status(400).send(error);
    }
  };

export default validate;
