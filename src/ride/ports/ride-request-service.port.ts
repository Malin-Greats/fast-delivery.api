import { RideRequestIn, RideRequestOut } from "../domain/dto/ride-request.dto";
export interface IRideRequestService{
    cancelRequest(customerId: string):Promise<RideRequestOut>
    createRequest(requestIn:RideRequestIn):Promise<RideRequestOut>
    broadcastRequest(requestId:string):Promise<RideRequestOut>
    acceptRequest(driverId:string):Promise<RideRequestOut>
    getCustomerCurrentRequest(customerId:string):Promise<RideRequestOut>
}
