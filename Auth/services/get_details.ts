const bcrypt = require("bcryptjs");
import { Users, PrismaClient, Buses, Organisations } from "@prisma/client";
import { logger } from "../Helpers/logger";

const { users, buses, organisations } = new PrismaClient();

export const GetorCreateOrganization = async (
  organizationReq: {email:string}
) => {
  let details = null;
  try {
  
    const website = organizationReq.email.split("@")[1];
    const name = website.split(".")[0];

    const websiteExist = await organisations.count({
      where: {website },
    });
    
    if (websiteExist) {
      details = organisations.findFirst({
        where: { website },
      });
    } else {
      
      details = await organisations.create({
        data: {
          website,
          name,
        },
      });
    }

    return details as Organisations;
  } catch (er: any) {
    logger.error(er);
    return null;
  }
};

export const GetorCreateBus = async (busReq: {
  organisation_id: string;
  plateNumber: string;
  route:string|null;}) => {
  let details = null;
  try {
    
    logger.info({ type: "decryped GetorCreateBusReq", ...busReq });
    const plateNumber = busReq.plateNumber.trim().toUpperCase();
    const route = busReq.route?.trim().toUpperCase();

    const plateNumberExist = await buses.count({
      where: {         plateNumber: {contains:plateNumber.trim()},
 },
    });

    if (plateNumberExist) {
      details = buses.findFirst({
        where: {         plateNumber: {contains:plateNumber.trim()}
        , organisation_id: busReq.organisation_id },
      });
    } else {
      details = await buses.create({
        data: {
          plateNumber: plateNumber,
          route: route,
          organisation_id: busReq.organisation_id,
        },
      });
    }

    return details as Buses;
  } catch (er: any) {
    logger.error(er);
    return null
  }
};
