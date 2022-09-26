import { RideRequest } from "../ride-request.model"
import { RideType } from "../../utils/enums/ride-type.enum"
import { RideRequestStatus } from "../../utils/enums/request-status.enum"
export interface RideRequestIn{
    customer_id:string
    pick_from:string
    drop_to:string
    request_time:Date
    est_cost:number
    ride_type:RideType
    request_status:RideRequestStatus
}
export interface IRideRequestStatus{
    request_status:RideRequestStatus
}
export interface RideRequestOut{
    
}
export function NewRideRequest ({customer_id, pick_from, drop_to, request_time,est_cost, ride_type}:RideRequestIn):RideRequest{
    const newRideRequest:RideRequest = new RideRequest()
    newRideRequest.customer_id= customer_id 
    newRideRequest.pick_from =pick_from
    newRideRequest.drop_to =drop_to
    newRideRequest.request_time=request_time,
    newRideRequest.est_cost=est_cost
    newRideRequest.ride_type=ride_type
    return newRideRequest
}