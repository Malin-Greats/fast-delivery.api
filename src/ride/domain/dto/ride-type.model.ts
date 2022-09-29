import { RideType } from "../ride-type.model"

export interface  RideTypeIn{
    vehicle_image:string
    max_passengers:number
    multiplier:number
    title:string
}

export function NewRideType({multiplier, title, max_passengers, vehicle_image}:RideTypeIn):RideType{
    const rideType=new RideType()
    rideType.vehicle_image  = vehicle_image
    rideType.multiplier = multiplier
    rideType.max_passengers = max_passengers
    rideType.title = title
    return rideType
}

