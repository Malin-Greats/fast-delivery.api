import { sign, SignOptions, verify } from "jsonwebtoken"
import { IToken } from "../auth/domain/dto/auth/jwt.dto";
import dotenv from 'dotenv';
import AppError from "./errors/error";
dotenv.config();
export interface Payload{
    userId:string;
    role:string
}

class JwtAuth{
    public static async generateToken(payload:Payload):Promise<IToken>{
        const expires_in:number=60*60
        let access_token!:string
        try {
            const SECRET=process.env.JWT_SECRET_KEY as string
            access_token= sign(payload,SECRET ,  { expiresIn:expires_in})
        } catch (error) {
            throw new AppError("Unauthorized Access. Please login!")
        }

        return {access_token, expires_in}
    }

    public static async verifyToken(token:string){
        try {
            const SECRET=process.env.JWT_SECRET_KEY as string
            return await verify(token, SECRET) as Payload
        } catch (error) {
           throw new AppError("Unauthorized Access.")
        }

    }
}
export {JwtAuth as jwt}
