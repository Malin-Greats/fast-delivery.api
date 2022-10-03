import { IObject } from "../../../shared/dto/filter-by.dto"
import { RideIn } from "../../domain/dto/ride.dto"
import { Ride } from "../../domain/ride.model"
import { RideStatus } from "../../utils/enums/ride-status.enum"

export interface IRideRepository{
    create(rideIn: RideIn):Promise<Ride>
    update(id:string,requestIn:IObject):Promise<Ride>
    findOneBy(filter:IObject):Promise<Ride|null>
    findAllBy(filter:IObject|null):Promise<Ride[]>
    findById(id:string): Promise<Ride>
    hasRideWithStatus(...ridesStatus:RideStatus[]):Promise<any>
}