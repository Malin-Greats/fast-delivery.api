import {  IObject } from "../../../shared/dto/filter-by.dto"
import { RideRequestIn } from "../../domain/dto/ride-request.dto"
import { RideRequest } from "../../domain/ride-request.model"

export interface IRideRequestRepository{
    create(requestIn:RideRequestIn):Promise<RideRequest>
    update(id:string,requestIn:IObject):Promise<RideRequest>
    findById(id:string):Promise<RideRequest>
    findAllBy(filter:IObject):Promise<RideRequest[]>
    findOneBy(filter:IObject):Promise<RideRequest>
}