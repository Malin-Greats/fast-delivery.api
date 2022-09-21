import { Role } from "../../domain/role.model"
import { User } from "../../domain/user.model"

export interface UserOut{
    ID          :string
    username    :string
    email       :string
    contact     :string
    role        :string
    isVerified  :boolean
    isActive    :boolean
    createdAt    :Date
}

export function toUserOut({ID, username, email, contact, isActive, isVerified, createdAt}:User, role:string):UserOut{
    let  userOut:UserOut = {ID:ID, username:username, email:email, contact:contact,
        isActive:isActive, isVerified:isVerified, createdAt:createdAt, role:role}
    return   userOut
}