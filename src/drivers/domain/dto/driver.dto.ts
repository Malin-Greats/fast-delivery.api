import { UserProfile } from "../../../shared/dto/profile.dto"
import { DriverApprovalStatus as ApprovalStatus } from "../../utilts/enums/driver-approval-status.enum"
import { DriverRidingStatus as RidingStatus } from "../../utilts/enums/driver-riding-status.enum"
import { DriverDocuments } from "../driver-docs.model"
import { Driver} from "../driver.model"
import { Vehicle } from "../vehicles.model"
import { Hashing as hash } from "../../../shared/hashing"
import { OnlineStatus } from "../../../shared/enums/online-status.enum"
export interface DriverIn  {
    firstname    :string
    lastname    :string
    email       :string
    password    :string
    phone_number     :string
    profile_photo?:string
    national_id:string
    role:"driver"
}
export interface IDriverApproval{
    approval_status:ApprovalStatus
}
export interface IDriverApprovalStatus{
    approval_status:ApprovalStatus
    is_approved:boolean
}

export interface DriverOut extends UserProfile{
    id:string
    role:string
    ride_status:string
    approval_status:string
    national_id:string
    rating:number
}

export async function NewDriver({firstname, lastname, email, phone_number, password, profile_photo,  national_id}:DriverIn):Promise<Driver>{
    const hashedPassword =  await hash.Hash(password)
    const driver = new Driver()
    driver.firstname = firstname
    driver.lastname = lastname
    driver.is_verified = false
    driver.is_active =true
    driver.online_status = OnlineStatus.OFFLINE
    driver.email = email
    driver.phone_number = phone_number
    driver.password = hashedPassword
    driver.profile_photo=profile_photo
    driver. national_id=  national_id
    driver.ride_status= RidingStatus.NO_RIDE
    driver.approval_status=ApprovalStatus.PENDING
    return driver
}

export function toDriverOut({  id,firstname, lastname, email, phone_number, role , ride_status, approval_status, national_id, rating }:Driver):DriverOut{
    const driver:DriverOut ={id, firstname, lastname, email, phone_number,ride_status, approval_status,rating,national_id,role: role.name}
    return driver
}