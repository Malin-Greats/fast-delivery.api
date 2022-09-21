import { subtle } from "crypto";
import { NextFunction, Request, Response } from "express";
import { IJWTPayload } from "../../auth/dto/auth/jwt.dto";
import { ERole } from "../../auth/enums/user-role.enum";
import { jwt } from "../_helpers/jwt.util";
// import { jwt } from "../_helpers/jwt.util";

export const isAuthorized=(validRoles:ERole[])=>(req:Request,res:Response,next:NextFunction)=>{
   const authHeaderToken =req.get('Authorization')
    if(!authHeaderToken){
        return res.sendStatus(401)
    }

   let payload = jwt.verifyToken(authHeaderToken!) as IJWTPayload
   if (!payload){
    return res.status(401).send("Invalid token!")
   }
   //Authorization
   if (validRoles.length==0){
        return next()
   }
   let isRoleValid:boolean =false
   for (let role of validRoles){
    const strRole = <string>role.toLowerCase()
    if (strRole ===payload.role.toLocaleLowerCase()){
        isRoleValid=true
        break
    }
   }
   if( !isRoleValid){
    return res.status(401).send(`User with the role: ${payload.role} is not authorized for this route`)
   }
    next()
}
export const isAuthenticated=(req:Request,res:Response,next:NextFunction)=>{
    // const authHeader = req.headers.authorization
    // if(!authHeader){
    //     res.status(401).send("JWT Token is missing")
    // }
    // const [,token]=authHeader!.split(' ');
    // try {
    //     const decodeToken = jwt.verifyToken(token);
    //     const {sub} =decodeToken  as ITokenPayload
    //     req.user={
    //         id:sub,
    //     };
    //     return next()
    // } catch (error) {
    //     res.status(401).send("Invalid JWT Token .")
    // }

}