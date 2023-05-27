import { Express, Request, Response } from "express";
import { validateRequest } from "../middleware";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "./uploads");
  },
  filename: (req: Request, file: any, cb: any) => {
    cb(
      null,
      new Date().getTime().toString() +
        "-" +
        file.fieldname +
        path.extname(file.originalname)
    );
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  // limits: { fileSize: 1024 * 1024 * 6 },
  // fileFilter:fileFilter
});


import { GetBusReq, GetOrganizationReq } from "../controller";
import { busGetCreateSchema, organizationGetCreateSchema } from "../middleware/schema/get_create";
import { Get } from "../controller/pot";

const initRoute="/get";

export const GetRoute=  (app: Express)=>{
  app.get(initRoute+"/api", Get);

 
  app.post(initRoute+"/api/organization", validateRequest(organizationGetCreateSchema), GetOrganizationReq);

  app.post(initRoute+"/api/bus", validateRequest(busGetCreateSchema), GetBusReq);


  //,upload.array("files"),
}
