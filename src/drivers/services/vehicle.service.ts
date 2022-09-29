import logger from "../../shared/errors/logger";
import { VehicleIn, VehicleOut, toVehicleOut } from "../domain/dto/vehicle.dto";
import { IVehicleRepository } from "../ports/vehicle-repository.port";
import { IVehicleService } from "../ports/vehicle-service.port";

export class VehicleService implements IVehicleService{

    constructor(private _vehicleRepository:IVehicleRepository) {}
   
    async addVehicle(vehicleIn: VehicleIn): Promise<VehicleOut> {
        const vehicle =await this._vehicleRepository.create(vehicleIn)
        const vehicleOut= toVehicleOut(vehicle)
        return vehicleOut
    }
    async findVehicleById(id: string): Promise<VehicleOut> {
        const vehicle =await this._vehicleRepository.findById(id)
        const vehicleOut= toVehicleOut(vehicle)
        return vehicleOut
    }
    async updateVehicle(id:string, vehicleIn: VehicleIn): Promise<VehicleOut> {
        const vehicle =await this._vehicleRepository.update(id, vehicleIn)
        const vehicleOut= toVehicleOut(vehicle)
        return vehicleOut
    }
    async deleteVehicle(id: string): Promise<VehicleOut> {
        const vehicle =await this._vehicleRepository.delete(id)
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

    async findAllVehicles(): Promise<VehicleOut[]> {
        const vehicles= await this._vehicleRepository.findAll()
        let vehiclesOut:VehicleOut[]=[];
        for (let vehicle of vehicles){
            const vehicleOut= toVehicleOut(vehicle)
            logger.info(vehicleOut)
            vehiclesOut.push(vehicleOut)
        }
        return vehiclesOut
    }
    

}