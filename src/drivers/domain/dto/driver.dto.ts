import { IUserProfile } from "../../../auth/domain/dto/profile/profile.dto"
import { UserIn } from "../../../auth/domain/dto/user/user.dto"
import { Driver, DriverApprovalStatus, RideStatus } from "../driver.model"

export interface DriverIn extends UserIn{}
export interface IDriverApproval{
    approval_status:DriverApprovalStatus
}
export interface IDriverApprovalStatus{
    approval_status:DriverApprovalStatus
    is_approved:boolean
}
interface driverInfo{
        ride_status:string
        approval_status:string
        overall_rating:number
}
export interface DriverOut{
    id:string
    driving_info:driverInfo
    profile:IUserProfile
}

export function NewDriver():Driver{
    const driver = new Driver()
    driver.ride_status= RideStatus.NO_RIDE
    driver.approval_status=DriverApprovalStatus.PENDING
    return driver
}

export function toDriverOut({  id, ride_status, approval_status,overall_rating, user}:Driver):DriverOut{
    const info:driverInfo={
        ride_status, approval_status, overall_rating,
    }

    const {firstname, lastname, email, contact, role, }=user
    const userOut:IUserProfile={
        firstname, lastname, email, contact,role: role.name
    }
    const driver:DriverOut ={id, profile:userOut,driving_info:info}
    return driver
}