import { object, string, ref } from "yup";

export const emailSchema = object({
    body: object({
      email: string()
        .required("Email is required").email(),
       
    }),
  });

  export const sendTokenSchema = object({
    body: object({
      email: string()
        .required("Email is required").email(),
       
    }),
  });

  export const verifyTokenSchema = object({
    body: object({
      email: string()
        .required("Email is required").email(),
       token: string()
       .required("Token is required"),
    }),
  });
  
  

  export const busGetCreateSchema = object({
    body: object({
        organisation_id: string()
        .required("organisationId is required"),
        plateNumber: string()
        .required("plate number is required"),
       
    }),
  });
