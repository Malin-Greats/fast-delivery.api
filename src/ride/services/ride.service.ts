// import { RideRequestCancelledOut } from "../domain/dto/cancelled-ride-request.dto";
// import { RideRequestIn, RideRequestOut } from "../domain/dto/ride-request.dto";
// import { RideOut } from "../domain/dto/ride.dto";
// import { IRideRequestCancelledRepository } from "../ports/cancelled-ride-repository";
// import { IRideRepository } from "../ports/ride-repository.port";
// import { IRideRequestRepository } from "../ports/ride-request-repository";
// import { IRideService } from "../ports/ride-service.port";

// export class RideService implements IRideService {

//     constructor (private _rideRepo:IRideRepository, private _rideRequestRepo:IRideRequestRepository, private _cancelledRideRepo:IRideRequestCancelledRepository){}

    

//     async cancelRide(): Promise<RideRequestCancelledOut> {
//         this._rideRepo.update()
//     }

//     async startRide(): Promise<RideOut> {
//         throw new Error("Method not implemented.");
//     }

//     async stopRide(): Promise<RideOut> {
//         throw new Error("Method not implemented.");
//     }

//    async  getRide(): Promise<RideOut> {
//         throw new Error("Method not implemented.");
//     }

//     async payForRide(): Promise<RideOut> {
//         throw new Error("Method not implemented.");
//     }

//     async acceptRide(): Promise<RideOut> {
//         throw new Error("Method not implemented.");
//     }

// }