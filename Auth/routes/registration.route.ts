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

import {
//   RegisterOrganizationReq,
//   RegisterBusReq,
  RegisterUserReq,
  LoginUserReq,
  
} from "../controller";
// import Register from "./controller/user/register";

import { Get } from "../controller/pot";
import {
  loginSchema,
  registerBusSchema,
  registerOrganizationSchema,
  registerUserSchema,
} from "../middleware/schema/registration";

const initRoute="/register";
export const RegistrationRoute= (app: Express)=> {
  app.get("/api", Get);

//   app.post(
//     initRoute+"/api/bus",
//     validateRequest(registerBusSchema),
//     RegisterBusReq
//   );
  app.post(
    initRoute+"/api/user",
    validateRequest(registerUserSchema),
    RegisterUserReq
  );
//   app.post(
//     initRoute+"/api/organization",
//     validateRequest(registerOrganizationSchema),
//     RegisterOrganizationReq
//   );
 
}


