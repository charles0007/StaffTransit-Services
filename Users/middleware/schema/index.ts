import { object, string, ref } from "yup";

export const emailSchema = object({
  body: object({
    email: string()
      .required("Email is required").email(),
   
  }),
});

export const organisationSchema = object({
  body: object({
   
      organisation_id: string().required("organisation_id is required"),
      // type: string().required("Bus is required").equals(["bus"]),
  }),
});

export const busDetailsByPlateSchema = object({
  body: object({

    plateNumber: string().required("Plate Number is required"),

      organisation_id: string().required("organisation is required"),
      // type: string().required("Bus is required").equals(["bus"]),
  }),
});
