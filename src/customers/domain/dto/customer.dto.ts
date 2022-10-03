import { OnlineStatus } from "../../../shared/enums/online-status.enum"
import { Customer } from "../customer.model"
import { Hashing as hash } from "../../../shared/hashing"
export interface CustomerIn{
    is_verified?:boolean
    firstname    :string
    lastname    :string
    email       :string
    password    :string
    phone_number     :string
    profile_photo?:string
    role:"customer"
}

export interface CustomerOut{
    id          :string
    firstname    :string
    lastname    :string
    email       :string
    phone_number     :string
    role        :string
    profile_photo?:string
    is_verified  :boolean
    is_active    :boolean
    created_at    :Date
    updated_at     : Date
    online_status:OnlineStatus
}

export async function NewCustomer({ firstname,lastname,email,password,phone_number, profile_photo}:CustomerIn):Promise<Customer>{
    const hashedPassword =  await hash.Hash(password)
    let  customer:Customer = new Customer()
    customer.firstname =firstname
    customer.lastname =lastname
    customer.email =email
    customer.phone_number =phone_number
    customer.is_active=true
    customer.is_verified=false
    customer.password=hashedPassword
    customer.profile_photo=profile_photo
    customer.online_status = OnlineStatus.OFFLINE
    return   customer
}

export function toCustomerOut({id, firstname,lastname, email, phone_number, is_active, is_verified, created_at, updated_at, profile_photo, online_status}:Customer, role:string):CustomerOut{
    let  customerOut:CustomerOut = {
        id, firstname, lastname, email, phone_number, profile_photo,
        is_active, is_verified, created_at, updated_at,role: role,
        online_status: online_status,
    }
    return   customerOut
}