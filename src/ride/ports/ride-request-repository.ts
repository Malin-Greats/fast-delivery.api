import { RideRequestIn } from "../domain/dto/ride-request.dto"
import { RideRequest } from "../domain/ride-request.model"

export interface IRideRequestRepository{
    create(requestIn:RideRequestIn):Promise<RideRequest>
    update(id:string,requestIn:RideRequestIn):Promise<RideRequest>
    findById(id:string):Promise<RideRequest>
    findAll(filterBy:string):Promise<RideRequest[]>
}