import { RideRequestIn } from "../../domain/dto/ride-request.dto"
import { RideRequest } from "../../domain/ride-request.model"
import { Ride } from "../../domain/ride.model"

export interface IRideRequestService{
    broadcastPendingRequests():Promise<RideRequest[]>
    cancelRequest(customerId: string):Promise<RideRequest>
    createRequest(requestIn:RideRequestIn):Promise<RideRequest>
    acceptRequest(driverId:string, requestId:string): Promise<Ride> 
    getCustomerCurrentRequest(customerId:string):Promise<RideRequest>
}
