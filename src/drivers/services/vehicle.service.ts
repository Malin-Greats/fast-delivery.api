import logger from "../../shared/errors/logger";
import { VehicleIn, VehicleOut, toVehicleOut } from "../domain/dto/vehicle.dto";
import { IVehicleRepository } from "../ports/vehicle-repository.port";
import { IVehicleService } from "../ports/vehicle-service.port";

export class VehicleService implements IVehicleService{

    constructor(private _vehicleRepository:IVehicleRepository) {}
   
    async addDriverVehicle( vehicleIn: VehicleIn): Promise<VehicleOut> {
       const vehicle =await this._vehicleRepository.create(vehicleIn)
       const vehicleOut= toVehicleOut(vehicle)
       return vehicleOut
    }

    async findDriverVehicles(driverId: string): Promise<VehicleOut[]> {
        const vehicles= await this._vehicleRepository.findByDriverId(driverId)
        let vehiclesOut:VehicleOut[]=[];
        for (let vehicle of vehicles){
            const vehicleOut= toVehicleOut(vehicle)
            logger.info(vehicleOut)
            vehiclesOut.push(vehicleOut)
        }
        return vehiclesOut
    }
    
}