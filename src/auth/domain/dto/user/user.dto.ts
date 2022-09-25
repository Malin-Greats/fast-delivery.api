import { User } from "../../user.model"


export interface UserIn{
    is_verified?:boolean
    firstname    :string
    lastname    :string
    email       :string
    password    :string
    contact     :string
    profile_photo?:string
    role:"admin"|"customer"|"driver"
}

export interface UserOut{
    id          :string
    firstname    :string
    lastname    :string
    email       :string
    contact     :string
    role        :string
    profile_photo?:string
    is_verified  :boolean
    is_active    :boolean
    created_at    :Date
    updated_at     : Date
}

export function toNewUser({ firstname, lastname, email, contact, password, profile_photo}:UserIn):User{
    let  user:User = new User()
    user.firstname =firstname
    user.lastname =lastname
    user.email =email
    user.contact =contact
    user.is_active=true
    user.is_verified=false
    user.password=password
    user.profile_photo=profile_photo
    return   user
}

export function toUserOut({id, firstname,lastname, email, contact, is_active, is_verified, created_at, updated_at, profile_photo}:User, role:string):UserOut{
    let  userOut:UserOut = {id, firstname, lastname, email, contact,profile_photo,
        is_active,is_verified, created_at,  updated_at,role:role,}
    return   userOut
}