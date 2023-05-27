import { object, string, ref } from "yup";

export const organizationGetCreateSchema = object({
    body: object({
      email: string()
        .required("Email is required").email(),
       
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
