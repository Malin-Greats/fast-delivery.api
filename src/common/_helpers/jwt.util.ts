import { sign, SignOptions, verify } from "jsonwebtoken"
import { IToken } from "../../auth/dto/auth/jwt.dto";
export interface Payload{
    userId:string;
    role:string
}
import { EnvConfig as env } from "../config/env.config"

class JwtAuth{

    public static generateToken(payload:Payload):IToken{
        const expiresIn:number=60*60
        let token!:string
        try {
           token= sign(payload, env.SECRET_KEY,  { expiresIn})
        } catch (error) {
            throw error
        }

        return {token, expiresIn}
    }

    public static verifyToken(token:string){
        return verify(token, env.SECRET_KEY)
    }
}
export {JwtAuth as jwt}
