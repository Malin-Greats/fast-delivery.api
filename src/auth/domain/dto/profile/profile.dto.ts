import { User } from "../../user.model";
export interface IProfilePhoto{
    profile_photo:string
}
export interface IUserProfile{
    email:string
    firstname: string;
    lastname: string;
    contact:string
    role:string
    rating?:string
    profile_photo?:string
}


export function toUserProfile({email, firstname, lastname, contact, role, profile_photo}:User):IUserProfile{
    const  userProfile:IUserProfile ={email, firstname, lastname, contact,profile_photo, role:role.name,}
    return   userProfile
}