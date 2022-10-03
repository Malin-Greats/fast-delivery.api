import { RideRequest } from "../ride-request.model"
import { RideRequestStatus } from "../../utils/enums/request-status.enum"
import{ Place }  from "../../../shared/dto/location.dto"
import  {TravelInfo} from "../../../shared/dto/travel-info.dto"
import { RideType } from "../ride-type.model"

export interface RideRequestIn{
    customer_id:string
    pick_from:Place
    drop_to:Place
    travel_time:string
    cost:number
    ride_type_id:string
    payment_id:string
    travel_information:TravelInfo
    request_status:RideRequestStatus
}
export interface RideRequestOut{
    id:string
    customer_id:string
    pick_from:Place
    drop_to:Place
    travel_time:string
    cost:number
    request_status:RideRequestStatus
    is_paid_for:boolean
    created_at:Date
    ride_type:RideType
    travel_information:TravelInfo
}
export function NewRideRequest ({customer_id, pick_from, drop_to,cost, travel_time, ride_type_id, payment_id, travel_information, request_status}:RideRequestIn):RideRequest{
    const newRideRequest:RideRequest = new RideRequest()
    newRideRequest.customer_id= customer_id
    newRideRequest.pick_from =pick_from
    newRideRequest.drop_to =drop_to
    newRideRequest.travel_time=travel_time
    request_status?newRideRequest.request_status =request_status:request_status=RideRequestStatus.PENDING
    newRideRequest.cost=cost
    newRideRequest.ride_type_id=ride_type_id
    newRideRequest.payment_id=payment_id
    newRideRequest.travel_information = travel_information
    newRideRequest.is_paid_for=false
    return newRideRequest
}