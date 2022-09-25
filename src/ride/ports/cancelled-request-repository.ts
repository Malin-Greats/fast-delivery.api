import { RideRequestCancelled } from "../domain/cancelled-ride-request.model";
import { RideRequestCancelledIn } from "../domain/dto/cancelled-ride-request.dto";
export interface IRideRequestCancelledRepository{
    create(requestIn:RideRequestCancelledIn):Promise<RideRequestCancelled>
    update(id:string,requestIn:RideRequestCancelledIn):Promise<RideRequestCancelled>
    findById(id:string):Promise<RideRequestCancelled>
    findAll(filterBy:string):Promise<RideRequestCancelled[]>
}