import { validationResult } from "express-validator";
import { IAuthService } from "../../auth/ports/auth-service.port";
import { ApiResponse } from "../../shared/dto/response";
import { Request, Response } from "express";
import { ERole as role } from "../../auth/domain/role.model";
import AppError, { isError } from "../../shared/errors/error";
import { LoginIn } from "../../auth/domain/dto/auth/login.dto";
import { IToken } from "../../auth/domain/dto/auth/jwt.dto";
import { DriverIn } from "../domain/dto/driver.dto";
import { DriverProfile } from "../domain/dto/driver-profile.dto";

export class DriverAuthHandler{

    constructor(private _authService:IAuthService<DriverIn, DriverProfile>){}

    async signUp(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request=<DriverIn>req.body
            request.role =role.DRIVER

        try {
            apiResponse.data =await this._authService.signUp(request)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                return res.status(apiResponse.errors.statusCode).json(apiResponse.errors)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(apiResponse)
    
    }
    async  login(req:Request, res:Response){
        const apiResponse  = new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request=<LoginIn>req.body
        try {
            apiResponse.data=await this._authService.login(request);
            res.setHeader('Set-Cookie', [this.createCookie(apiResponse.data.token)]);
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
         }
         return res.status(200).json(apiResponse)
    }

    private createCookie(tokenData: IToken) {
        return `Authorization=${tokenData.access_token}; HttpOnly; Max-Age=${tokenData.expires_in}`;
    }

}