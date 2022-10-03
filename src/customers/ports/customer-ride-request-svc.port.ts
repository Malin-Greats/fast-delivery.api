import { CustomerRideRequest } from "../domain/dto/customer-ride-request.dto";

export interface  ICustomerRideRequestSvc{
        myRideRequests(token:string):Promise<CustomerRideRequest[]>
}