import { RideTypeIn } from "../../domain/dto/ride-type.model"
import { RideType } from "../../domain/ride-type.model"

export interface IRideTypeRepository{
    create(rideTypeIn: RideTypeIn):Promise<RideType>
    update(id:string, rideTypeIn:RideTypeIn):Promise<RideType>
    delete(id:string):Promise<RideType>
    findById(id:string):Promise<RideType>
    findAll():Promise<RideType[]>
}