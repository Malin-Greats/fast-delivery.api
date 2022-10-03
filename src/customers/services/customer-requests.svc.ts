import { RideOut } from "../../ride/domain/dto/ride.dto";
import { RideRequest } from "../../ride/domain/ride-request.model";
import { jwt } from "../../shared/jwt.util";
import { CustomerRideRequest, toCustomerRideRequest } from "../domain/dto/customer-ride-request.dto";
import { ICustomerRepo } from "../ports/customer-repo.port";


export class CustomerRideRequestsSvc{
    constructor ( private _customerRepo:ICustomerRepo){}

    async myRideRequests(customerId:string):Promise<CustomerRideRequest[]>{
        const customer = await this._customerRepo.findById(customerId)
        const ridesRequests:RideRequest[] =customer.ride_requests
        const customerRequests:CustomerRideRequest[]=[]
        for (let x of ridesRequests){
            const ride = toCustomerRideRequest(x)
            customerRequests.push(ride)
        }
        return customerRequests
    }

    // async  sendRequest(customer_id:string, requestIn:RideRequestIn):Promise<RideRequestOut>{
    //     requestIn.customer_id =customer_id
    //     const request = await this._rideRequest.createRequest(requestIn)
    //     return request
    // }

    // async  cancelRequest(customer_id:string, requestIn:RideRequestIn):Promise<RideRequestOut>{
    //     requestIn.customer_id =customer_id
    //     const request = await this._rideRequest.cancelRequest(customer_id)
    //     return request
    // }
}