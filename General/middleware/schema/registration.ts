import { object, string, ref } from "yup";

export const registerUserSchema = object({
  body: object({
    email: string()
      .required("Email is required").email(),
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password can't be less than 8 digit"),
      bus: string().required("Bus is required"),
      organisation: string().required("organisation is required"),
      // type: string().required("Bus is required").equals(["user"]),
  }),
});

export const registerBusSchema = object({
  body: object({
    email: string()
      .required("Email is required").email(),
    driver: string().required("Driver Name is required"),
    plateNumber: string().required("Plate Number is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password can't be less than 8 digit"),
      organisation_id: string().required("organisation is required"),
      // type: string().required("Bus is required").equals(["bus"]),
  }),
});


export const registerOrganizationSchema = object({
  body: object({
    email: string()
      .required("Email is required").email(),
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password can't be less than 8 digit"),
      // type: string().required("Type is required").equals([ "organization"]),
  }),
});

export const loginSchema = object({
  body: object({
    email: string()
      .required("Email is required").email(),
      password: string()
      .required("Password is required")
      .min(8, "Password can't be less than 8 digit"),
      // type: string().required("Type is required").equals([ "organization","user","bus"]),
  }),
});


