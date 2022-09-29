import { CancelledRide } from "../cancelled-ride-request.model";
import { Ride } from "../ride.model";
export interface IRequestStatus{
    request_status:string
}
export interface CancelledRideIn{
    ride_id:string
    cancelled_by:string
    reason:string
}
interface cancelledOut{
    ride_id:string
    cancelled_by:string
    cancelled_time:Date
    penalt_fee:number
    reason:string
}
export interface CancelledRideOut{
    cancellation_details:cancelledOut
    ride:Ride
}

export function NewCancelledRide({cancelled_by,reason, ride_id,}: CancelledRideIn):CancelledRide{
 const requestCancelled = new CancelledRide()
 requestCancelled.cancelled_by =cancelled_by
 requestCancelled.cancelled_time = new Date()
 requestCancelled.penalt_fee = 0.2
 requestCancelled.reason = reason
 requestCancelled.ride_id = ride_id
 return  requestCancelled
}

export function toCancelledRideOut({ride_id, cancelled_by, cancelled_time,penalt_fee, reason, ride}: CancelledRide):CancelledRideOut{
    const cancellation_details :cancelledOut={ride_id, cancelled_by, cancelled_time,penalt_fee, reason}
    const requestCancelled:CancelledRideOut = {cancellation_details,ride}
    return  requestCancelled
}