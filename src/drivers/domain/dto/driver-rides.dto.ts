import { Ride } from "../../../ride/domain/ride.model"
import { RideMemberProfile } from "../../../shared/dto/profile.dto"
import { toUserRide, UserRide } from "../../../shared/dto/user-ride.dto"

export interface DriverRide extends UserRide{
    customer:RideMemberProfile
}

export function toDriverRide(ride:Ride):DriverRide{
   const { firstname, lastname,profile_photo, rating} = ride.customer
    const participant:RideMemberProfile={ firstname, lastname,profile_photo, rating}
    const driverRide:DriverRide = {...toUserRide(ride),customer: participant}
    return driverRide
}