import { RideRequestCancelledOut } from "../domain/dto/cancelled-ride-request.dto";
import { RideRequestOut, RideRequestIn } from "../domain/dto/ride-request.dto";
import { IRideRequestRepository } from "../ports/ride-request-repository";
import { IRideRequestService } from "../ports/ride-request-service.port";

export class RideRequestService implements IRideRequestService{

    constructor(private _rideRequestRepo:IRideRequestRepository){}

    async cancelRideRequest(customerId: string, rideRequestIn:RideRequestIn): Promise<RideRequestOut> {
        const cancelledRideRequest = await this._rideRequestRepo.update(customerId, rideRequestIn)
        return cancelledRideRequest
    }
    async  createRideRequest(rideRequestIn: RideRequestIn): Promise<RideRequestOut> {
        const request  = await this._rideRequestRepo.create(rideRequestIn)
        return request
    }
    async findCancelledRideRequestsByCustomerId(customerId: string): Promise<RideRequestCancelledOut[]> {
        const  cancelledRequests= await this._rideRequestRepo.findAll(customerId);
        return cancelledRequests
    }

}