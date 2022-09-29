import { VehicleOut, VehicleIn } from "../domain/dto/vehicle.dto";

export interface IVehicleService{
    addVehicle(vehicleIn:VehicleIn):Promise<VehicleOut>
    findVehicleById(id:string):Promise<VehicleOut>
    updateVehicle(id:string, vehicleIn:VehicleIn):Promise<VehicleOut>
    deleteVehicle(id:string):Promise<VehicleOut>
    findDriverVehicles(driverId:string):Promise<VehicleOut[]>
    findAllVehicles():Promise<VehicleOut[]>
}