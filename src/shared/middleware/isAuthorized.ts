import { Request, Response, NextFunction } from "express"
import { ERole as role } from "../../auth/domain/role.model"
import { IJWTPayload } from "../../auth/dto/auth/jwt.dto"
import { jwt } from "../jwt.util"
export const isAuthorized=(validRoles:role[])=>async (req:Request,res:Response,next:NextFunction)=>{
    const authHeaderToken =req.get('Authorization')
     if(!authHeaderToken){
         return res.sendStatus(401)
     }
 
    let payload:IJWTPayload ;
    try {
        payload = await jwt.verifyToken(authHeaderToken!) as IJWTPayload
    } catch (error) {
        return res.status(401).send(error)
    }
    //Authorization
    if (validRoles.length==0){
         return next()
    }
    let isRoleValid:boolean =false
    for (let role of validRoles){
     if (role ===payload.role){
         isRoleValid=true
         break
     }
    }
    if( !isRoleValid){
     return res.status(401).send(`User with the role: ${payload.role} is not authorized for this route`)
    }
     next()
 }