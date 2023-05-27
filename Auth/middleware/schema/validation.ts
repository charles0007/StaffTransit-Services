const Joi = require("@hapi/joi");

interface registerValidationI {
  name: string;
  email: string;
  password: string;  
  phone: string|null;
  address: string|null;
  isAdmin: boolean;
}
interface tokenValidationI {
  name: string;
  email: string;
  Id: string;  
  NativeId: number;
  bus_id: string;
  organisation_id: string;
  shareLocation: boolean;
}

interface loginValidationI {
  email: string;
  password: string;
 
}

export const registerValidation = (data: registerValidationI) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().allow("").optional(),
    address: Joi.string().allow("").optional(),
    isAdmin: Joi.boolean().optional(),
    // isDarkTheme: Joi.boolean().optional(),
  }).options({ abortEarly: true });

  return JoiSchema.validate(data);
};

export const loginValidation = (data:loginValidationI) => {
  const JoiSchema = Joi.object({
    email: Joi.string().required().email(), //.optional(),    
    password: Joi.string().required(),
  }).options({ abortEarly: true });

  return JoiSchema.validate(data);
};


export const tokenValidation = (data:tokenValidationI) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    Id: Joi.string().required(),
    NativeId: Joi.number().required(),
    bus_id: Joi.string().allow("").optional(),
    organisation_id: Joi.string().allow("").optional(),
    shareLocation: Joi.boolean().optional(),
  }).options({ abortEarly: true });

  return JoiSchema.validate(data);
};



