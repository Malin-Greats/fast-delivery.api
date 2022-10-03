import { Ride } from "../../ride/domain/ride.model"
import { jwt } from "../../shared/jwt.util"
import { DriverRide, toDriverRide } from "../domain/dto/driver-rides.dto"
import { IDriverRepository } from "../ports/driver-repository.port"

export class DriverRideService{
    constructor ( private _driverRepo:IDriverRepository){}

    async myRides(token:string):Promise<DriverRide[]>{
        const payload = await  jwt.verifyToken(token)
        const driver = await this._driverRepo.findById(payload.userId)
        const rides:Ride[] =driver.rides
        const driverRides:DriverRide[]=[]
        for (let x of rides){
            const ride = toDriverRide(x)
            driverRides.push(ride)
        }
        return driverRides
    }
}