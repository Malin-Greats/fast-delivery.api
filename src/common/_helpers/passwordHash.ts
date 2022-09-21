import *  as bcrypt from 'bcrypt'

export class PasswordHashing{
    static async Hash(input: string):Promise<string>{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(input, salt);
        return hashedPassword
    }
   static async CheckHash(input:string, hashedInput:string):Promise<boolean>{
        const isValid=await bcrypt.compare(input, hashedInput)
        return isValid
    }
}
