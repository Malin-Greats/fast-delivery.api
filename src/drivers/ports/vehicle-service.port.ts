import { VehicleOut, VehicleIn } from "../domain/dto/vehicle.dto";

export interface IVehicleService{
    addDriverVehicle(vehicleIn:VehicleIn):Promise<VehicleOut>
    findDriverVehicles(driverId:string):Promise<VehicleOut[]>
}