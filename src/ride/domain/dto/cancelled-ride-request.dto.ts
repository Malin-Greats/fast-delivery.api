import { RideRequestCancelled } from "../cancelled-ride-request.model";

export interface RideRequestCancelledIn{
    
}
export interface RideRequestCancelledOut{

}

export function NewRideRequestCancelled(request: RideRequestCancelledIn):RideRequestCancelled{
 const requestCancelled = new RideRequestCancelled()
 return  requestCancelled
}
