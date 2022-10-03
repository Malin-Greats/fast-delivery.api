import { IObject } from "../../shared/dto/filter-by.dto";
import AppError from "../../shared/errors/error";
import {  RideRequestIn } from "../domain/dto/ride-request.dto";
import { requestToRideIn, RideIn } from "../domain/dto/ride.dto";
import { RideRequest } from "../domain/ride-request.model";
import { Ride } from "../domain/ride.model";
import { IRideRequestRepository } from "../ports/ride-request/ride-request-repository";
import { IRideRequestService } from "../ports/ride-request/ride-request-service.port";
import { IRideTypeRepository } from "../ports/ride-type/ride-type-repository.port";
import { IRideRepository } from "../ports/ride/ride-repository.port";
import { IRideRequestStatus, RideRequestStatus  as requestStatus} from "../utils/enums/request-status.enum";
import { RideStatus as rideStatus} from "../utils/enums/ride-status.enum";

export class RideRequestService implements IRideRequestService{

    constructor(private _rideRequestRepo:IRideRequestRepository, private _rideRepo:IRideRepository, private _rideTypeRepo:IRideTypeRepository){}
   

    async cancelRequest(filter:IObject): Promise<RideRequest> {
        const request =await this._rideRequestRepo.findBy(filter)
        if(!request){
            throw new AppError(`Request with id ${filter.by.id} doens't exists.` )
        }
        let cancelledRideRequest!:RideRequest;
        if(request){
            if(request.request_status!==requestStatus.PENDING){
                throw new AppError(`You cannot cancel a ${request.request_status} request` )
            }
                cancelledRideRequest = await this._rideRequestRepo.update(request.id,{by:{request_status:requestStatus.CANCELLED}} )
        }
        return cancelledRideRequest
    }

    async createRequest(requestIn: RideRequestIn): Promise<RideRequest> {
        requestIn.request_status =requestStatus.PENDING
        const requestPending=<IObject>{by:{customer_id:requestIn.customer_id, request_status:requestStatus.PENDING}}
        const requestAccepted=<IObject>{by:{customer_id:requestIn.customer_id, request_status:requestStatus.ACCEPTED}}

        const [ hasPendingRequest, hasAcceptedRequest] = await Promise.all( [
            this._rideRequestRepo.findBy(requestPending),
            this._rideRequestRepo.findBy(requestAccepted)])

        if (hasPendingRequest ){
            throw new AppError(`User with id: ${requestIn.customer_id} has a pending request`)
        // }else if(hasAcceptedRequest){
        //     throw new AppError(`User with id: ${requestIn.customer_id} has an accepted request`)
        }
        await this._rideTypeRepo.findById(requestIn.ride_type_id)
        const newRequest = await this._rideRequestRepo.create(requestIn )
        return newRequest
    }

    async pendingRequests(): Promise<RideRequest[]> {
        const PENDING=<IObject>{by:{request_status:requestStatus.PENDING}}
        const pendingRequests=await this._rideRequestRepo.findAllBy(PENDING)
        return  pendingRequests
    }
    async acceptRequest(driver_id:string, request_id:string): Promise<Ride> {
       const rideRequest = await this._rideRequestRepo.findById(request_id)
       const rideWithStatus = await this._rideRepo.hasRideWithStatus( rideStatus.PENDING,rideStatus.ACCEPTED,  rideStatus.STARTED,rideStatus.IN_TRANSIT)
       if(rideWithStatus.is_true){
            throw new AppError(`You can't accept a request while already having ${rideWithStatus.ride_status} ride`)
       }
       if (rideRequest.request_status===requestStatus.PENDING){
        const ACCEPTED= <IRideRequestStatus>{request_status:requestStatus.ACCEPTED}
        const acceptedRequest = await this._rideRequestRepo.update(request_id,{by:ACCEPTED} )

        const rideIn:RideIn =requestToRideIn(acceptedRequest)
        const ride =await this._rideRepo.create({...rideIn,driver_id})
        return ride
       }else{
        throw new AppError(`Ride request already changed to ${rideRequest.request_status} state`)
       }
    }

   async  currentRequest(filter: IObject): Promise<RideRequest> {
        filter.by.request_status =requestStatus.PENDING
        
        const request = await this._rideRequestRepo.findBy(filter)
        if (!request){
            throw new AppError("No Pending Ride Requests Found") 
        }
        return request
    }

    async findOneBy(filter:IObject):Promise<RideRequest>{
        const request = await this._rideRequestRepo.findBy(filter)
        if(request){
            return  request
        }
        throw new AppError(`Ride request with ${filter.by.id} does not exist`)
    }

    async findAllBy(filter?:IObject): Promise<RideRequest[]> {
        const requests=await this._rideRequestRepo.findAllBy(filter)
        return  requests
    }

    async deleteRequest(filter:IObject):Promise<RideRequest>{
        const request=await this._rideRequestRepo.delete(filter)
        return  request
    }



}