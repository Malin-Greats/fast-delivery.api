import { User } from "../../../auth/domain/user.model"
import { IProfile } from "../../../auth/dto/profile/profile.dto"
import { UserIn } from "../../../auth/dto/user/create-user.dto"
import { UserOut } from "../../../auth/dto/user/get-user.dto"
import { Driver } from "../driver.model"
import { Vehicle } from "../vehicles.model"
import { DriverDocumentsOut } from "./driver-docs.dto"
import { VehicleOut } from "./vehicle.dto"

export interface DriverIn extends UserIn{

}
interface driverInfo{
        ride_status:string
        approval_status:string
        overall_rating:number
}
export interface DriverOut{
    id:string
    driving_info:driverInfo
    profile:IProfile
}
export function toDriverOut({  id, ride_status, approval_status,overall_rating, user}:Driver):DriverOut{
    const info:driverInfo={
        ride_status, approval_status, overall_rating,
    }
    const {firstname, lastname, email, contact}=user
    const userOut:IProfile={firstname, lastname, email, contact}
    const driver:DriverOut ={id, profile:userOut,driving_info:info}
    return driver
}