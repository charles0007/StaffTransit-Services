const bcrypt = require("bcryptjs");
import { Request, Response } from "express";
import { Users, PrismaClient } from "@prisma/client";
import { logger } from "../Helpers/logger";
import {
  RegisterBusReqI,
  RegisterOrganisationReqI,
  RegisterUserReqI,
} from "./interface";
import { DecryptDataToJson, EncryptData } from "../services/encryption";
import { GetorCreateBus, GetorCreateOrganization } from "../services/get_details";
const { users, buses, organisations } = new PrismaClient();

export const RegisterUserReq = async (req: Request, res: Response) => {
  logger.info({ type: "encryped RegisterUserReq", ...req.body });

  try {
    const userReq = (await DecryptDataToJson(req.body)) as RegisterUserReqI;
    logger.info({ type: "decryped RegisterUserReq", ...userReq });
    const emailExist = await users.count({ where: { email: userReq.email } });
    if (emailExist)
      return res.status(409).send({
        errorMessage: "User already exist",
        successful: false,
      });

      let bus_id=userReq.bus_id;
      let organisation_id=userReq.organisation_id;
      
      if(userReq.organisation_id==null|| userReq.organisation_id==""){
       const orgData =await GetorCreateOrganization({email:userReq.email});
       organisation_id=orgData.Id;
      }
      if(userReq.bus_id==null|| userReq.bus_id==""){
        const busData =await GetorCreateBus({organisation_id,route:userReq.route,plateNumber:userReq.plateNumber});
        bus_id=busData.Id;
       }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(userReq.password, salt);
    let registerDetails = null;
    registerDetails = await users.create({
      data: {
        email: userReq.email,
        name: userReq.name,
        gender: userReq.gender,
        phone: userReq.phone,
        token: userReq.token,
        deviceToken: userReq.deviceToken,
        image_name: userReq.image_name,
        image_path: userReq.image_path,
        bus_id,
        organisation_id,
        lat: userReq.lat,
        lng: userReq.lng,
        currentAddress: userReq.currentAddress,
        busStop: userReq.busStop,
        busStopLat: userReq.busStopLat,
        busStopLng: userReq.busStopLng,
        password: hashedPassword,
      },
      select: {
        email: true,
        name: true,
        phone: true,
        bus_id: true,
        bus: true,
        organisation_id: true,
        organisation: true,
      },
    });

    logger.info(registerDetails);

    const result=await EncryptData({ status: true, registerDetails });
   return res.send(result);
  } catch (er: any) {
    logger.error(er);
   return res.status(500).send({ status: false,error:"something went wrong, try again later" });
  }
};

// export const RegisterBusReq = async (req: Request, res: Response) => {
//   logger.info({ type: "encryped RegisterBusReq", ...req.body });

//   try {
//     const busReq = (await DecryptDataToJson(req.body)) as RegisterBusReqI;
//     logger.info({ type: "decryped RegisterBusReq", ...busReq });
//     const emailExist = await buses.count({ where: { email: busReq.email } });
//     if (emailExist)
//       return res.status(409).send({
//         errorMessage: "User already exist",
//         successful: false,
//       });

//     const salt = await bcrypt.genSalt(10);

//     const hashedPassword = await bcrypt.hash(busReq.password, salt);
//     let registerDetails = null;

//     registerDetails = await buses.create({
//       data: {
//         driver: busReq.driver,
//         email: busReq.email,
//         phone: busReq.phone,
//         plateNumber: busReq.plateNumber,
//         route: busReq.route,
//         lat: busReq.lat,
//         lng: busReq.lng,
//         deviceToken: busReq.deviceToken,
//         currentAddress: busReq.currentAddress,
//         organisation_id: busReq.organisation_id,
//         password: hashedPassword,
//       },
//       select: {
//         email: true,
//         driver: true,
//         phone: true,
//         plateNumber: true,
//         route: true,
//         organisation_id: true,
//         organisation: true,
//       },
//     });

//     logger.info(registerDetails);

//     const result=await EncryptData({ status: true, registerDetails });
//    return res.send(result);
//   } catch (er: any) {
//     logger.error(er);
//    return res.status(500).send({ status: false,error:"something went wrong, try again later" });
//   }
// };

// export const RegisterOrganizationReq = async (req: Request, res: Response) => {
//   logger.info({ type: "encryped RegisterOrganizationReq", body: req.body });

//   try {
//     const organisationReq = (await DecryptDataToJson(
//       req.body
//     )) as RegisterOrganisationReqI;
//     logger.info({
//       type: "decryped RegisterOrganizationReq",
//       body: organisationReq,
//     });
//     const emailExist = await organisations.count({
//       where: { email: organisationReq.email },
//     });
//     if (emailExist)
//       return res.status(409).send({
//         errorMessage: "User already exist",
//         successful: false,
//       });

//     const salt = await bcrypt.genSalt(10);

//     const hashedPassword = await bcrypt.hash(organisationReq.password, salt);
//     let registerDetails = null;

//     registerDetails = await organisations.create({
//       data: {
//         email: organisationReq.email,
//         name: organisationReq.name,
//         address: organisationReq.address,
//         city: organisationReq.city,
//         state: organisationReq.state,
//         openHr: organisationReq.openHr,
//         openMin: organisationReq.openMin,
//         closeHr: organisationReq.closeHr,
//         closeMin: organisationReq.closeMin,
//         lat: organisationReq.lat,
//         lng: organisationReq.lng,
//         password: hashedPassword,
//       },
//       select: {
//         email: true,
//         name: true,
//         address: true,
//         city: true,
//         state: true,
//       },
//     });

//     logger.info(registerDetails);
// const result=await EncryptData({ status: true, registerDetails });
//    return res.send(result);
//   } catch (er: any) {
//     logger.error(er);
//    return res.status(500).send({ status: false,error:"something went wrong, try again later" });
//   }
// };

// export const RegisterReq = async (req: Request, res: Response) => {
//   logger.info({ type: "encryped RegisterReq", ...req.body });

//   try {
//     const body = (await DecryptDataToJson(req.body)) as
//       | RegisterUserReqI
//       | RegisterBusReqI
//       | RegisterOrganisationReqI;
//     logger.info({ type: "decryped RegisterReq", ...body });
//     const emailExist = await users.count({ where: { email: body.email } });
//     if (emailExist)
//       return res.send({
//         errorMessage: "User already exist",
//         successful: false,
//       });

//     const salt = await bcrypt.genSalt(10);

//     const hashedPassword = await bcrypt.hash(body.password, salt);
//     let registerDetails = null;
//     if (body.type === "user") {
//       const userReq = body as RegisterUserReqI;
//       registerDetails = await users.create({
//         data: {
//           email: userReq.email,
//           name: userReq.name,
//           gender: userReq.gender,
//           phone: userReq.phone,
//           token: userReq.token,
//           deviceToken: userReq.deviceToken,
//           image_name: userReq.image_name,
//           image_path: userReq.image_path,
//           bus_id: userReq.bus_id,
//           organisation_id: userReq.organisation_id,
//           lat: userReq.lat,
//           lng: userReq.lng,
//           currentAddress: userReq.currentAddress,
//           busStop: userReq.busStop,
//           busStopLat: userReq.busStopLat,
//           busStopLng: userReq.busStopLng,
//           password: hashedPassword,
//         },
//       });
//     } else if (body.type === "bus") {
//       const busReq = body as RegisterBusReqI;
//       registerDetails = await buses.create({
//         data: {
//           driver: busReq.driver,
//           email: busReq.email,
//           phone: busReq.phone,
//           plateNumber: busReq.plateNumber,
//           route: busReq.route,
//           lat: busReq.lat,
//           lng: busReq.lng,
//           deviceToken: busReq.deviceToken,
//           currentAddress: busReq.currentAddress,
//           organisation_id: busReq.organisation_id,
//           password: hashedPassword,
//         },
//       });
//     } else if (body.type === "organization") {
//       const organisationReq = body as RegisterOrganisationReqI;
//       registerDetails = await organisations.create({
//         data: {
//           email: organisationReq.email,
//           name: organisationReq.name,
//           address: organisationReq.address,
//           city: organisationReq.city,
//           state: organisationReq.state,
//           openHr: organisationReq.openHr,
//           openMin: organisationReq.openMin,
//           closeHr: organisationReq.closeHr,
//           closeMin: organisationReq.closeMin,
//           lat: organisationReq.lat,
//           lng: organisationReq.lng,
//           password: hashedPassword,
//         },
//       });
//     }

//     logger.info(registerDetails);

//     res.send({  status: true, registerDetails });
//   } catch (er: any) {
//     logger.error(er);
//     res.status(400).send({  status: false });
//   }
// };
