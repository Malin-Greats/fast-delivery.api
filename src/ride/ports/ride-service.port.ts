import { User } from "../../auth/domain/user.model";
import { RideRequestCancelledOut } from "../domain/dto/cancelled-ride-request.dto";
import { RideRequestIn, RideRequestOut } from "../domain/dto/ride-request.dto";
import { RideOut } from "../domain/dto/ride.dto";

export interface IRideService{
    requestRide(rideRequestIn:RideRequestIn):Promise<RideRequestOut>
    cancelRideRequest(rideRequestIn:RideRequestIn):Promise<RideRequestCancelledOut>
    cancelRide(userId:string):Promise<RideRequestCancelledOut>
    startRide(driverId:string):Promise<RideOut>
    stopRide(driverId:string):Promise<RideOut>
    getRide(ridId:string):Promise<RideOut>
    payForRide(customerId:string):Promise<RideOut>
    acceptRide(driverId:string):Promise<RideOut>
}