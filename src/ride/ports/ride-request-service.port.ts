import { RideRequestCancelledOut } from "../domain/dto/cancelled-ride-request.dto";
import { RideRequestIn, RideRequestOut } from "../domain/dto/ride-request.dto";

export interface IRideRequestService{
    cancelRideRequest(customerId: string, rideRequestIn:RideRequestIn):Promise<RideRequestOut>
    createRideRequest(rideRequestIn:RideRequestIn):Promise<RideRequestOut>
    findCancelledRideRequestsByCustomerId(customerId:string):Promise<RideRequestCancelledOut[]>
}