import { IRequestStatus } from "../domain/dto/cancelled-ride-request.dto"
import { RideRequestIn } from "../domain/dto/ride-request.dto"
import { RideRequest } from "../domain/ride-request.model"
import { RideRequestStatus } from "../utils/enums/request-status.enum"

export interface IRideRequestRepository{
    create(requestIn:RideRequestIn):Promise<RideRequest>
    update(id:string,requestIn:RideRequestIn | IRequestStatus):Promise<RideRequest>
    findById(id:string):Promise<RideRequest>
    findAll(filterBy:string):Promise<RideRequest[]>
    hasRequestWithStatus(customer_id:string, request_status:RideRequestStatus):Promise<boolean>
}