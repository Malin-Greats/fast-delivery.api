import { RideIn } from "../domain/dto/ride.dto"
import { Ride } from "../domain/ride.model"

export interface IRideRepository{
    create(requestIn:RideIn):Promise<Ride>
    update(id:string,requestIn:Ride):Promise<Ride>
    findById(id:string):Promise<Ride>
    findAll(filterBy:string):Promise<Ride[]>
}