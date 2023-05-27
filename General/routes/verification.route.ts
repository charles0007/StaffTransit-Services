import { Express, Request, Response } from "express";
import { validateRequest } from "../middleware";


import {

  SendTokenReq,
  VerifyTokenReq,

} from "../controller";

import {
  emailSchema, sendTokenSchema, verifyTokenSchema
} from "../middleware/schema/verification";
import { Get } from "../controller/pot";

const initRoute="/verification";

export const VerificationRoute=  (app: Express)=>{

  app.get(initRoute+"/api", Get);

 
  app.post(initRoute+"/api/send/token", validateRequest(sendTokenSchema), SendTokenReq);
  app.post(initRoute+"/api/verify/token", validateRequest(verifyTokenSchema), VerifyTokenReq);


//   app.post(initRoute+"/api/bus", validateRequest(loginSchema), LoginBusReq);

//   app.post(
//     initRoute+"/api/organization",
//     validateRequest(loginSchema),
//     LoginOrganizationReq
//   );

  //,upload.array("files"),
}

