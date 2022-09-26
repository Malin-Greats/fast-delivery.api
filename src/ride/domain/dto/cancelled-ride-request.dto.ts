import { CancelledRide } from "../cancelled-ride-request.model";
export interface IRequestStatus{
    request_status:string
}
export interface CancelledRideIn{
    
}
export interface CancelledRideOut{

}

export function NewCancelledRide(request: CancelledRideIn):CancelledRide{
 const requestCancelled = new CancelledRide()
 return  requestCancelled
}
