
import { RideRequestIn, RideRequestOut } from "../domain/dto/ride-request.dto";
import { RideOut } from "../domain/dto/ride.dto";

export interface IRideService{
    cancelRide(userId:string):Promise<RideRequestOut>
    startRide(driverId:string):Promise<RideOut>
    stopRide(driverId:string):Promise<RideOut>
    getCurrentRide(userId:string):Promise<RideOut>
    payForRide(customerId:string):Promise<RideOut>
}