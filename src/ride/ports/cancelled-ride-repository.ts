import { CancelledRide } from "../domain/cancelled-ride-request.model"
import { CancelledRideIn } from "../domain/dto/cancelled-ride-request.dto"

export interface ICancelledRideRepository{
    create(requestIn:CancelledRideIn):Promise<CancelledRide>
    update(id:string,requestIn:CancelledRideIn):Promise<CancelledRide>
    findById(id:string):Promise<CancelledRide>
    findAll(filterBy:string):Promise<CancelledRide[]>
}