import { Express, Request, Response } from "express";
import { validateRequest } from "../middleware";


import {

  SendTokenReq,
  VerifyTokenReq,

} from "../controller";

import {
  sendNotificationSchema,
  shareLocationSchema
} from "../middleware/schema/settings";
import { Get } from "../controller/pot";
import { SendNotificationReq, ShareLocationReq } from "../controller/settings";

const initRoute="/settings";

export const SettingRoute=  (app: Express)=>{

  app.get(initRoute+"/api", Get);

 
  app.post(initRoute+"/api/share/location", validateRequest(shareLocationSchema), ShareLocationReq);

  app.post(initRoute+"/api/send/notification", validateRequest(sendNotificationSchema), SendNotificationReq);



}

