import *  as bcrypt from 'bcrypt'
import AppError from './errors/error';

export class Hashing{
    static async Hash(input: string):Promise<string>{
        let hashedValue!:string
        try {
            const salt = await bcrypt.genSalt();
            hashedValue = await bcrypt.hash(input, salt);
        } catch (error) {
            throw error
        }
    
        return hashedValue
    }
   static async CheckHash(input:string, hashedInput:string):Promise<boolean>{
        let  isValid!:boolean;
        try {
            isValid=await bcrypt.compare(input, hashedInput)

        } catch (error) {
            throw error
        }
       return isValid
    }
}
export async function  verifyPassword(password:string, hashedPassword:string){
    const isPasswordVerified =await Hashing.CheckHash(password,hashedPassword)
    if(isPasswordVerified){
        return isPasswordVerified
    }else{
        throw new AppError(`Invalid credentials.Please, try again!`);
    }
}
