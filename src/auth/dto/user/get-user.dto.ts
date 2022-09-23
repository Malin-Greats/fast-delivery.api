import { Role } from "../../domain/role.model"
import { User } from "../../domain/user.model"

export interface UserOut{
    id          :string
    firstname    :string
    lastname    :string
    email       :string
    contact     :string
    role        :string
    is_verified  :boolean
    is_active    :boolean
    created_at    :Date
    updated_at     : Date
}

export function toUserOut({id, firstname,lastname, email, contact, is_active, is_verified, created_at, updated_at}:User, role:string):UserOut{
    let  userOut:UserOut = {id, firstname, lastname, email, contact,
        is_active,is_verified, created_at,  updated_at,role:role,}
    return   userOut
}