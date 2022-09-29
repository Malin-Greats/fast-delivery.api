import { CancelledRideIn, CancelledRideOut, toCancelledRideOut } from "../domain/dto/cancelled-ride-request.dto";
import { ICancelledRideRepository } from "../ports/cancelled-ride/cancelled-ride-repository";
import { ICancelledRideService } from "../ports/cancelled-ride/cancelled-ride-service.port";


export class CancelledRideService implements ICancelledRideService  {

    constructor( private _cancelledRideRepo: ICancelledRideRepository){}

    async cancelRide(cancelledRideIn:CancelledRideIn): Promise<CancelledRideOut> {
        const cancelledRide = await this._cancelledRideRepo.create(cancelledRideIn)
        const cancelledOut = toCancelledRideOut(cancelledRide)
        return  cancelledOut
    }
  
}