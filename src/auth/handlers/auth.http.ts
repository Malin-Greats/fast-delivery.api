import { validationResult } from "express-validator";
import AppError, { isError } from "../../shared/errors/error";
import { IAuthService } from "../ports/auth-service.port";
import {Request, Response} from "express"
import { UserOut } from "../dto/user/get-user.dto";
import { UserIn } from "../dto/user/create-user.dto";
import { LoginIn, LoginOut } from "../dto/auth/login.dto";
import { IToken } from "../dto/auth/jwt.dto";
import { ERole as role } from "../domain/role.model";
export class AuthHandler{
    constructor(private _authService:IAuthService){}

    async signUp(req:Request, res:Response){
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let request=<UserIn>req.body
        request.role =role.CUSTOMER
        let result!:UserOut;

        try {
            result =await this._authService.signUp(request)
        } catch (error) {
            if (isError(error)){
               const err= new AppError(error.message,error.detail, 400)
                return res.status(err.statusCode).json(err)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(result)
    
    }

    async signUpDriver(req:Request, res:Response){
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request=<UserIn>req.body
        request.role =role.DRIVER

        let result!:UserOut; 
        try {
            result =await this._authService.signUp(request)
        } catch (error) {
            if (isError(error)){
               const err= new AppError(error.message,error.detail, 400)
                return res.status(err.statusCode).json(err)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(result)
    
    }
    async  login(req:Request, res:Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request=<LoginIn>req.body
        let response!:LoginOut
        try {
            response=await this._authService.login(request);
            res.setHeader('Set-Cookie', [this.createCookie(response.token)]);
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
         }
         return res.status(200).json(response)
    }

    private createCookie(tokenData: IToken) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    async loggingOut  (request: Request, response: Response) {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        response.send(200);
    }


}