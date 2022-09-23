import *  as bcrypt from 'bcrypt'

export class Hashing{
    static async Hash(input: string):Promise<string>{
        const salt = await bcrypt.genSalt();
        const hashedValue = await bcrypt.hash(input, salt);
        return hashedValue
    }
   static async CheckHash(input:string, hashedInput:string):Promise<boolean>{
        const isValid=await bcrypt.compare(input, hashedInput)
        return isValid
    }
}
