import { User } from "../../domain/user.model"

export interface UserIn{
    isVerified:boolean
    username    :string
    email       :string
    password    :string
    contact     :string
    roleId      :string
}

