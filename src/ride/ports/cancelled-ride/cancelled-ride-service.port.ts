import { CancelledRideIn, CancelledRideOut } from "../../domain/dto/cancelled-ride-request.dto"

export interface ICancelledRideService{
    cancelRide(cancelledRideIn:CancelledRideIn): Promise<CancelledRideOut>
}