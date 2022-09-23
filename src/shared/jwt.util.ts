import { sign, SignOptions, verify } from "jsonwebtoken"
import { IToken } from "../auth/dto/auth/jwt.dto";
import dotenv from 'dotenv';
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
            throw error
        }

        return {token, expiresIn}
    }

    public static async verifyToken(token:string){
        try {
            const SECRET=process.env.JWT_SECRET_KEY as string
            return await verify(token, SECRET) as Payload
        } catch (error) {
            throw error
        }

    }
}
export {JwtAuth as jwt}
