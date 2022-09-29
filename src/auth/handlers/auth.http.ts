import { validationResult } from "express-validator";
import AppError, { isError } from "../../shared/errors/error";
import { IAuthService } from "../ports/auth-service.port";
import {Request, Response} from "express"
import { LoginIn } from "../domain/dto/auth/login.dto";
import { IToken } from "../domain/dto/auth/jwt.dto";
import { ERole as role } from "../domain/role.model";
import { UserIn, UserOut } from "../domain/dto/user/user.dto";
import { ApiResponse } from "../../shared/dto/response";
export class AuthHandler{
    constructor(private _authService:IAuthService){}

    async signUp(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let request=<UserIn>req.body
        request.role =role.CUSTOMER

        try {
            apiResponse.data =await this._authService.signUp(request)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                return res.status(apiResponse.errors.statusCode).json(apiResponse)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(apiResponse)
    
    }

    async signUpAdmin(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let request=<UserIn>req.body
        request.role =role.ADMIN

        try {
            apiResponse.data =await this._authService.signUp(request)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                return res.status(apiResponse.errors.statusCode).json(apiResponse)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(apiResponse)
    
    }

    async signUpDriver(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request=<UserIn>req.body
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

    async loggingOut  (req: Request, res: Response) {
        res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        res.send(200);
    }


}