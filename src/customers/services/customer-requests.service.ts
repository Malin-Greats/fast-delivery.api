import { IUserService } from "../../auth/ports/user-service.port";
import { RideRequestIn, RideRequestOut } from "../../ride/domain/dto/ride-request.dto";
import { IRideRequestService } from "../../ride/ports/ride-request-service.port";

export class CustomerRequestsService{
    constructor ( private _rideRequest:IRideRequestService){}

    async  sendRequest(customer_id:string, requestIn:RideRequestIn):Promise<RideRequestOut>{
        requestIn.customer_id =customer_id
        const request = await this._rideRequest.createRequest(requestIn)
        return request
    }

    async  cancelRequest(customer_id:string, requestIn:RideRequestIn):Promise<RideRequestOut>{
        requestIn.customer_id =customer_id
        const request = await this._rideRequest.cancelRequest(customer_id)
        return request
    }
}