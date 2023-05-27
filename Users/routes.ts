import { Express, Request, Response } from "express";
import { validateRequest } from "./middleware";
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


import {
  
  GetAllBusDetailsByOrganisationReq,
  GetAllBusDetailsReq,
  GetAllUserDetailsByOrganisationReq,
  GetUserDetailsReq,
  GetAllUserDetailsReq,
  GetBusDetailsByPlateReq
  
} from "./controller";
// import Register from "./controller/user/register";

import { Get } from "./controller/pot";
import { GetOrganisationDetailsReq } from "./controller/organisation";
import { busDetailsByPlateSchema, emailSchema, organisationSchema } from "./middleware/schema";


export default function (app: Express) {
  app.get("/api", Get);
  
  app.post("/api/get/bus/organization",validateRequest(organisationSchema), GetAllBusDetailsByOrganisationReq);
  app.post("/api/get/bus/all", GetAllBusDetailsReq);
  app.post("/api/get/bus/plate",validateRequest(busDetailsByPlateSchema), GetBusDetailsByPlateReq);

  app.post("/api/get/organization/details",validateRequest(emailSchema), GetOrganisationDetailsReq);


  
  //,upload.array("files"),
  
}
