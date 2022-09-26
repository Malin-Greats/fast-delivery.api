import AppError from "../../shared/errors/error";
import { RideRequestOut, RideRequestIn, IRideRequestStatus } from "../domain/dto/ride-request.dto";
import { IRideRequestRepository } from "../ports/ride-request-repository";
import { IRideRequestService } from "../ports/ride-request-service.port";
import { RideRequestStatus  as requestStatus} from "../utils/enums/request-status.enum";

export class RideRequestService implements IRideRequestService{

    constructor(private _rideRequestRepo:IRideRequestRepository){}

    async cancelRequest(customerId: string): Promise<RideRequestOut> {
        const CANCELLED= <IRideRequestStatus>{request_status:requestStatus.CANCELLED}
        const cancelledRideRequest = await this._rideRequestRepo.update(customerId,CANCELLED )
        return cancelledRideRequest
    }
    async createRequest(requestIn: RideRequestIn): Promise<RideRequestOut> {
        requestIn.request_status =requestStatus.PENDING
        const [ hasPendingRequest, hasAcceptedRequest] = await Promise.all( [
            this._rideRequestRepo.hasRequestWithStatus(requestIn.customer_id, requestStatus.PENDING),
            this._rideRequestRepo.hasRequestWithStatus(requestIn.customer_id, requestStatus.ACCEPTED)])

        if (hasPendingRequest ){
            throw new AppError(`Customer with id: ${requestIn.customer_id} has a pending request`)
        }else if(hasAcceptedRequest){
            throw new AppError(`Customer with id: ${requestIn.customer_id} has an accepted request`)
        }
        const newRequest = await this._rideRequestRepo.create(requestIn)
        return newRequest
    }

    broadcastRequest(requestId: string): Promise<RideRequestOut> {
        throw new Error("Method not implemented.");
    }
    async acceptRequest(customerId:string): Promise<RideRequestOut> {
        const ACCEPTED= <IRideRequestStatus>{request_status:requestStatus.ACCEPTED}
        const acceptedRequest = await this._rideRequestRepo.update(customerId,ACCEPTED )
        return acceptedRequest
    }

    getCustomerCurrentRequest(customerId: string): Promise<RideRequestOut> {
        throw new Error("Method not implemented.");
    }

}