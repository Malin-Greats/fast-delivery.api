import { RideTypeIn } from "../../domain/dto/ride-type.model"
import { RideType } from "../../domain/ride-type.model"

export interface IRideTypeService{
    addRideType(rideTypeIn: RideTypeIn):Promise<RideType>
    updateRideType(id:string, rideTypeIn:RideTypeIn):Promise<RideType>
    deleteRideType(id:string):Promise<RideType>
    findRideTypeById(id:string):Promise<RideType>
    findAllRideTypes():Promise<RideType[]>
}