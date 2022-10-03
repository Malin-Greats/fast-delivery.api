import { IObject } from "../../shared/dto/filter-by.dto"
import AppError from "../../shared/errors/error"
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
        const foundRide = await this._rideRepo.findOneBy({by:{id:request.ride_id}})
        if(foundRide===null){
            throw new AppError("Ride doesn't exist")
        }

        if (foundRide && foundRide.ride_status===status.CANCELLED||foundRide.ride_status===status.STOPPED){
            throw new AppError(`You can't cancel ${foundRide?.ride_status} ride`)
        }
        
        let isUpdated=false
        if (request.cancelled_by==="driver"){
            rideStatus = <IRideStatus>{ride_status:status.PENDING }
            const ride =await this._rideRepo.update(request.ride_id,{by:rideStatus})
            await this._rideRequestRepo.update(ride.request_id, {by:{request_status:requestStatus.PENDING}})
            isUpdated = true
        }else if(request.cancelled_by==="customer"){
            rideStatus = <IRideStatus>{ride_status:status.CANCELLED }
            await this._rideRepo.update(request.ride_id,{by:rideStatus})
            isUpdated = true
        }
        if (!isUpdated){
            throw new AppError("Error Occured while cancelling the ride.")
        }
        const cancelledRide =await this._cancelledRidesService.cancelRide(request)
        return cancelledRide
    }

    async startRide(ride_id: string): Promise<RideOut> {
        const rideStatus = <IRideStatus>{ride_status:status.STARTED , start_time:new Date()}
        const ride = await this._rideRepo.update(ride_id,{by:rideStatus})
        const rideOut = toRideOut(ride)
        return rideOut
    }

    async stopRide( ride_id: string): Promise<RideOut> {
        const rideStatus = <IRideStatus>{ride_status:status.STOPPED, end_time:new Date() }
        const ride = await this._rideRepo.update(ride_id,{by:rideStatus})
        const rideOut = toRideOut(ride)
        return rideOut
    }

    async getCurrentRide(user_id:string, role:string): Promise<RideOut> {
        let filter!:IObject
        if (role=="driver"){
            filter ={by:{driver_id:user_id, ride_status:status.PENDING}}
        }else if(role=="customer"){
            filter ={by:{customer_id:user_id, ride_status:status.PENDING}}
        }
        const ride = await this._rideRepo.findOneBy(filter)
        if(ride && ride!==null){
            return ride
        }
        throw new AppError("No current ride found")
    }

    async findAllRidesBy(filter:IObject|null): Promise<RideOut[]>{
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

    async  currentRide(filter: IObject): Promise<RideOut> {
         const pending={by:{...filter.by, ride_status:status.PENDING}}
        const in_transit={by:{...filter.by, ride_status:status.IN_TRANSIT}}
        const started={by:{...filter.by, ride_status:status.STARTED}}
        const accepted={by:{...filter.by, ride_status:status.ACCEPTED}}

        const [ hasPending, hasIntransit, hasStarted, hasAccepted] = await Promise.all( [
            this._rideRepo.findOneBy(pending),
            this._rideRepo.findOneBy(in_transit),
            this._rideRepo.findOneBy(started),
            this._rideRepo.findOneBy(accepted)])

        if (hasPending &&hasPending!=null){
            return hasPending
        }
        else if(hasIntransit &&hasIntransit!=null){
            return hasIntransit
        }
        else if(hasStarted &&hasStarted!=null){
            return hasStarted
        }
        else if(hasAccepted &&hasAccepted!=null){
            return hasAccepted
        }
       throw new AppError("No current rides.")
    }

   
}