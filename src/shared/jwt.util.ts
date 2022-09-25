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
        const expiresIn:number=60*60
        let token!:string
        try {
            const SECRET=process.env.JWT_SECRET_KEY as string
            token= sign(payload,SECRET ,  { expiresIn})
        } catch (error) {
            throw new AppError("Unauthorized Access. Please login!")
        }

        return {token, expiresIn}
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
