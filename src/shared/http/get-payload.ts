import { ApiResponse } from "../dto/response"
import AppError from "../errors/error"
import {Request, Response } from "express"
import { jwt } from "../jwt.util"

export  const  getPayload =async(req:Request, res:Response)=>{
    const apiResponse= new ApiResponse()
    const token =req.get('Authorization')
    if(!token){
        apiResponse.errors = new AppError("Unauthorised Acess.")
        return res.status(401).json(apiResponse)
    }
    const payload = await jwt.verifyToken(token)
    return payload
}