import { RideStatus  as status } from "../../utils/enums/ride-status.enum"
import { RideType, RideType as type } from "../../utils/enums/ride-type.enum"
import { RideRequest } from "../ride-request.model"
import { Ride } from "../ride.model"

export interface RideIn{
    customer_id:string
    driver_id:string
    pick_from:string
    drop_to:string
    start_time:Date
    end_time:Date
    ride_cost:number
    ride_status:status
    ride_type:type
}

export interface RideOut{
    
}

export function NewRide({customer_id, pick_from, drop_to, ride_cost, ride_type, driver_id}:RideIn):Ride{
    const newRide = new Ride()
    newRide.customer_id= customer_id
    newRide.pick_from =pick_from
    newRide.drop_to =drop_to
    newRide.accepted_at= new Date()
    newRide.ride_cost=ride_cost
    newRide.ride_type=ride_type
    newRide.driver_id =driver_id
    newRide.ride_status = status.ACCEPTED
    return newRide
}

export function toRideOut(ride:Ride):RideOut{
    const rideOut:RideOut=ride as RideOut
    return rideOut
}