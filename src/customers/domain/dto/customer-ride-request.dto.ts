import { RideRequest } from "../../../ride/domain/ride-request.model"
import { RideType } from "../../../ride/domain/ride-type.model"
import { RideRequestStatus } from "../../../ride/utils/enums/request-status.enum"
import { Place as Location } from "../../../shared/dto/location.dto"
import { TravelInfo } from "../../../shared/dto/travel-info.dto"

export interface CustomerRideRequest{
    id:string
    pick_from:Location
    drop_to:Location
    travel_time:string
    cost:number
    ride_type: RideType
    request_status:RideRequestStatus
    is_paid_for:boolean
    travel_information:TravelInfo
}

export function toCustomerRideRequest({id, pick_from, drop_to, travel_time, cost, ride_type, request_status, is_paid_for, travel_information}:RideRequest):CustomerRideRequest{
    const request:CustomerRideRequest ={id, pick_from, drop_to, travel_time, cost, ride_type, request_status, is_paid_for, travel_information}
    return  request
}

