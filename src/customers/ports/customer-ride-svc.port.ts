import { CustomerRide } from "../domain/dto/customer-rides.dto";

export  interface ICustomerRideSvc{
    myRide(token:string):Promise<CustomerRide[]>
}