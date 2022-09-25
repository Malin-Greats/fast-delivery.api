import { RideRequestCancelledOut } from "../domain/dto/cancelled-ride-request.dto";
import { RideRequestOut } from "../domain/dto/ride-request.dto";
import { RideOut } from "../domain/dto/ride.dto";

export interface IRideService{
    requestRide():Promise<RideRequestOut>
    cancelRideRequest():Promise<RideRequestCancelledOut>
    cancelRide():Promise<RideRequestCancelledOut>
    startRide():Promise<RideOut>
    stopRide():Promise<RideOut>
    getRide():Promise<RideOut>
    payForRide():Promise<RideOut>
    acceptRide():Promise<RideOut>
}