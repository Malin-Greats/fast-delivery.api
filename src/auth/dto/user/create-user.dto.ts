import { User } from "../../domain/user.model"

export interface UserIn{
    is_verified:boolean
    firstname    :string
    lastname    :string
    email       :string
    password    :string
    contact     :string
    role:"admin"|"customer"|"driver"
}

