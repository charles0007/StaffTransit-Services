import { object, string, ref, boolean } from "yup";

export const shareLocationSchema = object({
    body: object({
      email: string()
        .required("Email is required").email(),
        shareLocation:boolean().required("shareLocation is required")
    }),
  });

  export const sendNotificationSchema = object({
    body: object({
      email: string()
        .required("Email is required").email(),
        notification:boolean().required("notification is required")
    }),
  });

