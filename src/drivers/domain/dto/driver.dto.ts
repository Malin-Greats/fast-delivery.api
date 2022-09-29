import { IUserProfile } from "../../../auth/domain/dto/profile/profile.dto"
import { UserIn } from "../../../auth/domain/dto/user/user.dto"
import { DriverApprovalStatus as ApprovalStatus } from "../../utilts/enums/driver-approval-status.enum"
import { DriverRidingStatus as RidingStatus } from "../../utilts/enums/driver-riding-status.enum"
import { DriverDocuments } from "../driver-docs.model"
import { Driver} from "../driver.model"
import { Vehicle } from "../vehicles.model"

export interface DriverIn extends UserIn{}
export interface IDriverApproval{
    approval_status:ApprovalStatus
}
export interface IDriverApprovalStatus{
    approval_status:ApprovalStatus
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
    vehicles:Vehicle[]
    documents:DriverDocuments
}

export function NewDriver():Driver{
    const driver = new Driver()
    driver.ride_status= RidingStatus.NO_RIDE
    driver.approval_status=ApprovalStatus.PENDING
    return driver
}

export function toDriverOut({  id, ride_status, approval_status,overall_rating, user, vehicles, documents}:Driver):DriverOut{
    const info:driverInfo={
        ride_status, approval_status, overall_rating,
    }

    const {firstname, lastname, email, contact, role, }=user
    const userOut:IUserProfile={
        firstname, lastname, email, contact,role: role.name
    }
    const driver:DriverOut ={id, profile:userOut,driving_info:info, vehicles:vehicles, documents:documents}
    return driver
}