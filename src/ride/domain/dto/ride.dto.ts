import { Place } from "../../../shared/dto/location.dto"
import { TravelInfo } from "../../../shared/dto/travel-info.dto"
import { RideStatus, RideStatus  as status } from "../../utils/enums/ride-status.enum"
import { RideRequest } from "../ride-request.model"
import { Ride } from "../ride.model"
import { RideRequestOut } from "./ride-request.dto"
export interface IRideStatus{
    ride_status:RideStatus
} 
export interface RideIn{
    customer_id:string
    driver_id:string
    pick_from:Place
    drop_to:Place
    ride_cost:number
    ride_status:status
    ride_type_id:string
    request_id:string
    is_paid_for:boolean
    travel_information:TravelInfo
}
export interface ICustomerDriver{
        customer_id:string
        driver_id:string
        ride_id:string
}
export interface IChangeRideState extends ICustomerDriver{
    ride_id:string
}

export interface IChangeRideRequestState extends ICustomerDriver{
    request_id:string
}
export interface RideOut{

}

export function NewRide({customer_id, pick_from, drop_to, ride_cost, ride_type_id, driver_id, request_id, is_paid_for, travel_information}:RideIn):Ride{
    const newRide = new Ride()
    newRide.customer_id= customer_id
    newRide.pick_from =pick_from
    newRide.drop_to =drop_to
    newRide.accepted_at= new Date()
    newRide.ride_cost=ride_cost
    newRide.ride_type_id=ride_type_id
    newRide.driver_id =driver_id
    newRide.ride_status = status.ACCEPTED
    newRide.request_id = request_id
    newRide.is_paid_for = is_paid_for
    newRide.travel_information = travel_information
    return newRide
}

export function toRideOut(ride:Ride):RideOut{
    const rideOut:RideOut=ride as RideOut
    return rideOut
}










export function requestToRideIn({id,customer_id, pick_from, drop_to, cost, ride_type_id,is_paid_for, travel_information }:RideRequest){
    const rideIn:RideIn = {
        request_id: id,customer_id, pick_from, drop_to,is_paid_for, ride_cost: cost, ride_type_id, driver_id: '',
        ride_status: status.ACCEPTED,travel_information
    }
    return rideIn
}