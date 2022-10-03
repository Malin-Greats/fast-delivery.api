import { Admin } from "../admin.model"
import { Hashing as hash } from "../../../shared/hashing"
import { OnlineStatus } from "../../../shared/enums/online-status.enum"

export interface AdminIn{
    firstname    :string
    lastname    :string
    email       :string
    password    :string
    phone_number     :string
    profile_photo?:string
    role:"admin"
}

export interface AdminOut{
    id:string
    firstname    :string
    lastname    :string
    email       :string
    phone_number     :string
    role        :string
    profile_photo?:string
}


export async function NewAdmin({ firstname,lastname,email,password,phone_number, profile_photo}:AdminIn):Promise<Admin>{
    const hashedPassword =  await hash.Hash(password)
    let  admin:Admin = new Admin()
    admin.firstname =firstname
    admin.lastname =lastname
    admin.email =email
    admin.phone_number =phone_number
    admin.is_active=true
    admin.is_verified=false
    admin.password=hashedPassword
    admin.online_status = OnlineStatus.ONLINE
    admin.profile_photo=profile_photo
    return   admin
}



export function toAdminOut({id, firstname,lastname, email, phone_number, profile_photo}:Admin, role:string):AdminOut{
    let  adminOut:AdminOut = {
        id, firstname, lastname, email, phone_number, profile_photo,role: role,
    }
    return   adminOut
}