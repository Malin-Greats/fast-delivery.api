import { IObject } from "../../shared/dto/filter-by.dto";
import AppError from "../../shared/errors/error";
import {  RideRequestIn } from "../domain/dto/ride-request.dto";
import { requestToRideIn, RideIn } from "../domain/dto/ride.dto";
import { RideRequest } from "../domain/ride-request.model";
import { Ride } from "../domain/ride.model";
import { IRideRequestRepository } from "../ports/ride-request/ride-request-repository";
import { IRideRequestService } from "../ports/ride-request/ride-request-service.port";
import { IRideRepository } from "../ports/ride/ride-repository.port";
import { IRideRequestStatus, RideRequestStatus  as requestStatus} from "../utils/enums/request-status.enum";

export class RideRequestService implements IRideRequestService{

    constructor(private _rideRequestRepo:IRideRequestRepository, private _rideRepo:IRideRepository){}

    async cancelRequest(request_id:string): Promise<RideRequest> {
        const CANCELLED= <IRideRequestStatus>{request_status:requestStatus.CANCELLED}
        const cancelledRideRequest = await this._rideRequestRepo.update(request_id,{by:{CANCELLED}} )
        return cancelledRideRequest
    }

    async createRequest(requestIn: RideRequestIn): Promise<RideRequest> {
        requestIn.request_status =requestStatus.PENDING
        // const requestPending=<IObject>{by:{customer_id:requestIn.customer_id, request_status:requestStatus.PENDING}}
        // const requestAccepted=<IObject>{by:{customer_id:requestIn.customer_id, request_status:requestStatus.ACCEPTED}}
        
        // const [ hasPendingRequest, hasAcceptedRequest] = await Promise.all( [
        //     this._rideRequestRepo.findOneBy(requestPending),
        //     this._rideRequestRepo.findOneBy(requestAccepted)])

        // if (hasPendingRequest ){
        //     throw new AppError(`Customer with id: ${requestIn.customer_id} has a pending request`)
        // }else if(hasAcceptedRequest){
        //     throw new AppError(`Customer with id: ${requestIn.customer_id} has an accepted request`)
        // }
        const newRequest = await this._rideRequestRepo.create(requestIn)
        return newRequest
    }

    async broadcastPendingRequests(): Promise<RideRequest[]> {
        const PENDING=<IObject>{by:{request_status:requestStatus.PENDING}}
        const pendingRequests=await this._rideRequestRepo.findAllBy(PENDING)
        return  pendingRequests
    }
    async acceptRequest(driver_id:string, request_id:string): Promise<Ride> {
       const rideRequest = await this._rideRequestRepo.findById(request_id)
       if (rideRequest.request_status===requestStatus.PENDING){
        const ACCEPTED= <IRideRequestStatus>{request_status:requestStatus.ACCEPTED}
        const acceptedRequest = await this._rideRequestRepo.update(request_id,{by:ACCEPTED} )

        const rideIn:RideIn =requestToRideIn(acceptedRequest)
        rideIn.driver_id =driver_id
        console.log(rideIn)
        const ride =await this._rideRepo.create(rideIn)
        console.log(ride)
        return ride
       }else{
        throw new AppError(`Ride request already changed to ${rideRequest.request_status} state`)
       }
    }

   async  getCustomerCurrentRequest(customer_id: string): Promise<RideRequest> {
        const filter:IObject={by:{customer_id,request_status:requestStatus.PENDING}}
        const request = await this._rideRequestRepo.findOneBy(filter)
        return request
    }

}