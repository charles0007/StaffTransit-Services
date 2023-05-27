const jwt=require('jsonwebtoken');
 require('dotenv').config();
import { NextFunction, Request, Response } from "express";

const VerifyToken = async (req: any, res: Response,next:NextFunction) => {

const token=req.header('auth-token');
if(!token) return res.status(401).send('Access Denied');
try{
const verified=jwt.verify(token,process.env.TOKEN_SECRET);
req.user=verified;
next();
}catch(er){
res.status(400).send("Invalid Token")
}
}
export default VerifyToken;