import { IObject } from "../../../shared/dto/filter-by.dto"
import { RideIn } from "../../domain/dto/ride.dto"
import { Ride } from "../../domain/ride.model"

export interface IRideRepository{
    create(rideIn: RideIn):Promise<Ride>
    update(id:string,requestIn:IObject):Promise<Ride>
    findOneBy(filter:IObject):Promise<Ride>
    findAllBy(filter:IObject):Promise<Ride[]>
    findById(id:string): Promise<Ride>
}