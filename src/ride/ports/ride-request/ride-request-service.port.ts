import { IObject } from "../../../shared/dto/filter-by.dto"
import { RideRequestIn } from "../../domain/dto/ride-request.dto"
import { RideRequest } from "../../domain/ride-request.model"
import { Ride } from "../../domain/ride.model"

export interface IRideRequestService{
    pendingRequests():Promise<RideRequest[]>
    cancelRequest(filter:IObject):Promise<RideRequest>
    createRequest(requestIn:RideRequestIn):Promise<RideRequest>
    acceptRequest(driverId:string, requestId:string): Promise<Ride>
    currentRequest(filter: IObject):Promise<RideRequest>
    findAllBy(filter?:IObject): Promise<RideRequest[]> 
    findOneBy(filter:IObject):Promise<RideRequest>
    deleteRequest(filter:IObject):Promise<RideRequest>
    
}
