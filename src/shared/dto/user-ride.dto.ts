import { RideMemberProfile } from "./profile.dto"
import { Place } from "./location.dto"
import { RideStatus } from "../../ride/utils/enums/ride-status.enum"
import { RideType } from "../../ride/domain/ride-type.model"
import { TravelInfo } from "./travel-info.dto"
import { Ride } from "../../ride/domain/ride.model"

export interface UserRide{
    id: string
    pick_from:Place
    drop_to:Place
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

export function toUserRide({id, pick_from, drop_to, accepted_at, start_time, end_time, ride_cost, ride_status, ride_type, is_paid_for,travel_information, rating}:Ride):UserRide{
    const ride:UserRide = {
        id,pick_from, drop_to,accepted_at,start_time,
        end_time,ride_cost,ride_status,ride_type,
        is_paid_for,travel_information,rating
    }
    return ride

    }