import { Request, Response, NextFunction } from "express"
import { ERole as role } from "../../auth/domain/role.model"
import { IJWTPayload } from "../../auth/domain/dto/auth/jwt.dto"
import { jwt } from "../jwt.util"
import { ApiResponse } from "../dto/response"
import AppError from "../errors/error"
export const isAuthorized=(validRoles:role[])=>async (req:Request,res:Response,next:NextFunction)=>{
    const apiResponse = new ApiResponse()
    const authHeaderToken =req.get('Authorization')
     if(!authHeaderToken){
        return res.sendStatus(401)
     }

    let payload:IJWTPayload ;
    try {
        payload = await jwt.verifyToken(authHeaderToken!) as IJWTPayload
    } catch (error) {
        apiResponse.errors = new AppError("Unauthorised access. Invalid token!")
        return res.status(401).json(apiResponse)
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
        apiResponse.errors= new AppError(`Role ${payload.role} is not authorized for this route`)
     return res.status(401).send(apiResponse)
    }
     next()
 }