import { validationResult } from "express-validator";
import {Request, Response} from "express"
import { UserIn } from "../dto/user/create-user.dto";
import { IAuthService } from "../ports/auth-service.port";
import { LoginIn } from "../dto/auth/login.dto";
import { IToken } from "../dto/auth/jwt.dto";

export class AuthHandler{

    constructor(private _authService:IAuthService){}

    async signUp(req:Request, res:Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let request=<UserIn>req.body
        let result =await this._authService.signUp(request)
        return res.status(201).json({result})
    }
    
    async  loginUser(req:Request, res:Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request=<LoginIn>req.body
        let result =await this._authService.loginUser(request)
        res.setHeader('Set-Cookie', [this.createCookie(result.token)]);
        const cookies = req.cookies;
    console.log("Cookies",cookies, "Auth")
        // res.header("x-auth-token", result.token)
        return res.status(201).json({result})
    }


    // async  verifyUser(req:Request, res:Response){
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }
    //     let request=<OtpIn>req.body
    //     let result =await this._authService.verifyUser(request)
    //     if (!result){
    //         return res.status(400).json({result})
    //     }
    //     return res.status(201).json({result})

    // }

    async  changerPassword(req:Request, res:Response){
        throw new Error("Not implemented!")
    }


    private createCookie(tokenData: IToken) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
      }

      async loggingOut  (request: Request, response: Response) {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        response.send(200);
      }
      
}