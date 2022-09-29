
import { IObject } from "../../shared/dto/filter-by.dto"
import { CancelledRideIn, CancelledRideOut } from "../domain/dto/cancelled-ride-request.dto"
import { RideIn, RideOut, toRideOut, IRideStatus} from "../domain/dto/ride.dto"
import { ICancelledRideService } from "../ports/cancelled-ride/cancelled-ride-service.port"
import { IRideRequestRepository } from "../ports/ride-request/ride-request-repository"
import { IRideRepository } from "../ports/ride/ride-repository.port"
import { IRideService } from "../ports/ride/ride-service.port"
import { RideRequestStatus  as requestStatus} from "../utils/enums/request-status.enum"
import { RideStatus as status } from "../utils/enums/ride-status.enum"


export class RideService implements IRideService {

    constructor (private _rideRepo:IRideRepository, private _rideRequestRepo:IRideRequestRepository,
         private _cancelledRidesService:ICancelledRideService){}

    async createRide(rideIn:RideIn): Promise<RideOut> {
       const ride =  await this._rideRepo.create(rideIn)
       const rideOut = toRideOut(ride)
        return rideOut
    }

    async cancelRide(request:CancelledRideIn): Promise<CancelledRideOut> {
        let rideStatus!:IRideStatus
        if (request.cancelled_by==="driver"){
            rideStatus = <IRideStatus>{ride_status:status.PENDING }
            const ride =await this._rideRepo.update(request.ride_id,{by:rideStatus})
            await this._rideRequestRepo.update(ride.request.id, {by:{request_status:requestStatus.PENDING}})
        }else if(request.cancelled_by==="customer"){
            rideStatus = <IRideStatus>{ride_status:status.CANCELLED }
            await this._rideRepo.update(request.ride_id,{by:rideStatus})
        }

        const cancelledRide =await this._cancelledRidesService.cancelRide(request)
        return cancelledRide
    }

    async startRide(ride_id: string): Promise<RideOut> {
        const rideStatus = <IRideStatus>{ride_status:status.STARTED }
        const ride = await this._rideRepo.update(ride_id,{by:rideStatus})
        const rideOut = toRideOut(ride)
        return rideOut
    }

    async stopRide( ride_id: string): Promise<RideOut> {
        const rideStatus = <IRideStatus>{ride_status:status.STOPPED }
        const ride = await this._rideRepo.update(ride_id,{by:rideStatus})
        const rideOut = toRideOut(ride)
        return rideOut
    }

    async getCurrentRide(filter:IObject): Promise<RideOut> {
        const ride = await this._rideRepo.findOneBy(filter)
        return ride
    }

    async findAllRidesBy(filter:IObject): Promise<RideOut[]>{
        const rides= await this._rideRepo.findAllBy(filter)
        const ridesOut:RideOut[]=[]
        for (let ride of rides){
            const rideOut = toRideOut(ride)
            ridesOut.push(rideOut)
        }
        return ridesOut
    }

    async findRideById(id:string): Promise<RideOut>{
        const ride= await this._rideRepo.findById(id)
        return ride
    }

    async payForRide(customerId: string, rideId: string): Promise<RideOut> {
        throw new Error("Method not implemented.");
    }
}