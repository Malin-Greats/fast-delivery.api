import { IObject } from "../../../shared/dto/filter-by.dto"
import { CancelledRideIn, CancelledRideOut } from "../../domain/dto/cancelled-ride-request.dto"
import { RideOut, RideIn } from "../../domain/dto/ride.dto"


export interface IRideService{
    cancelRide( cancelledRideIn:CancelledRideIn): Promise<CancelledRideOut>
    startRide(ride_id:string):Promise<RideOut>
    stopRide(ride_id:string):Promise<RideOut>
    createRide(rideIn:RideIn): Promise<RideOut> 
    getCurrentRide(filter:IObject):Promise<RideOut>
    payForRide(customer_id:string, ride_id:string):Promise<RideOut>
    findAllRidesBy(filter:IObject|null): Promise<RideOut[]>
    findRideById(id:string): Promise<RideOut>
}