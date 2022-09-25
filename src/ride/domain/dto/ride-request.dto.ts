import { RideRequest } from "../ride-request.model"

export interface RideRequestIn{
    
}
export interface RideRequestOut{
    
}
export function NewRideRequest (requestIn:RideRequestIn):RideRequest{
    const newRideRequest = new RideRequest()
    return newRideRequest
}