import { User } from "../../domain/user.model";

export interface IProfile{
    email:string
    firstname: string;
    lastname: string;
    contact:string
}


export function toUserProfile({email, firstname, lastname, contact}:User):IProfile{
    const  userProfile:IProfile ={email, firstname, lastname, contact}
    return   userProfile
}