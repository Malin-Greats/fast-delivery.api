import { CancelledRideIn } from "../../ride/domain/dto/cancelled-ride-request.dto"
import { RideOut } from "../../ride/domain/dto/ride.dto"
import { Ride } from "../../ride/domain/ride.model"
import { IRideService } from "../../ride/ports/ride/ride-service.port"
import { jwt } from "../../shared/jwt.util"
import { CustomerRide, toCustomerRide } from "../domain/dto/customer-rides.dto"
import { ICustomerRepo } from "../ports/customer-repo.port"


export class CustomerRideSvc {
    constructor ( private _customerRepo:ICustomerRepo){}

    async myRides(customerId:string):Promise<CustomerRide[]>{
        const customer = await this._customerRepo.findById(customerId)
        const rides:Ride[] =customer.rides
        const customerRides:CustomerRide[]=[]
        for (let x of rides){
            const ride = toCustomerRide(x)
            customerRides.push(ride)
        }
        return customerRides
    }
    // async  myRides(customer_id:string):Promise<RideOut>{
    //     const request = await this._rideService.findAllRidesBy({by:{customer_id}})
    //     return request
    // }

    // async  currentRide(customer_id:string):Promise<RideOut>{
    //     const ride = await this._rideService.getCurrentRide({by:{customer_id}})
    //     return ride
    // }

    // async  cancelRide(rideId:string, cancellRideIn:CancelledRideIn):Promise<RideOut>{
    //     const request = await this._rideService.cancelRide(cancellRideIn)
    //     return request
    // }
}