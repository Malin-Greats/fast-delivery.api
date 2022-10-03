import { RideType } from "../../../ride/domain/ride-type.model"
import { Ride } from "../../../ride/domain/ride.model"
import { RideStatus } from "../../../ride/utils/enums/ride-status.enum"
import { Place as Location } from "../../../shared/dto/location.dto"
import { RideMemberProfile } from "../../../shared/dto/profile.dto"
import { TravelInfo } from "../../../shared/dto/travel-info.dto"
import { toUserRide } from "../../../shared/dto/user-ride.dto"

export interface CustomerRide{
    id: string
    driver:RideMemberProfile
    pick_from:Location
    drop_to:Location
    accepted_at:Date
    start_time?:Date
    end_time?:Date
    ride_cost:number
    ride_status:RideStatus
    ride_type:RideType
    is_paid_for:boolean
    travel_information:TravelInfo
    rating?:number
}

export function toCustomerRide(ride:Ride):CustomerRide{
    const { firstname, lastname,profile_photo, rating} = ride.driver
    const participant:RideMemberProfile={ firstname, lastname,profile_photo, rating}
    const customerRide:CustomerRide = {...toUserRide(ride),driver: participant}
    return customerRide
}