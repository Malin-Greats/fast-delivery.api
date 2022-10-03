
import { UserProfile } from "../../../shared/dto/profile.dto"
import { Driver } from "../driver.model"

export interface  DriverProfile extends UserProfile{
    national_id:string
    ride_status:string
    role:string
}

export function toDriverProfile({ride_status,role,firstname,lastname, email,phone_number, profile_photo,rating, national_id}:Driver):DriverProfile{
    const roleName=role.name
    const profile:DriverProfile ={
        ride_status,
        firstname,
        lastname,
        email,
        phone_number,
        national_id,
        profile_photo,
        rating,
        role:roleName
    }
    return profile
}

