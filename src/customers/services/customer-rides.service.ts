import { CancelledRideIn } from "../../ride/domain/dto/cancelled-ride-request.dto"
import { RideOut } from "../../ride/domain/dto/ride.dto"
import { IRideService } from "../../ride/ports/ride-service.port"

export class CustomerRidesService {
    constructor ( private _rideService:IRideService){}

    async  myRides(customer_id:string):Promise<RideOut>{
        const request = await this._rideService.findAllRidesBy({by:{customer_id}})
        return request
    }

    async  currentRide(customer_id:string):Promise<RideOut>{
        const ride = await this._rideService.getCurrentRide({by:{customer_id}})
        return ride
    }

    async  cancelRide(rideId:string, cancellRideIn:CancelledRideIn):Promise<RideOut>{
        const request = await this._rideService.cancelRide(rideId, cancellRideIn)
        return request
    }
}