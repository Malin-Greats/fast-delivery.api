import { VehicleIn } from "../domain/dto/vehicle.dto";
import { Vehicle } from "../domain/vehicles.model";

export interface IVehicleRepository {
    create(vehicleIn:VehicleIn):Promise<Vehicle>
    delete(id:string):Promise<Vehicle>
    findById(id:string):Promise<Vehicle>
    findByDriverId(driverId:string):Promise<Vehicle[]>
    findByPlateNumber(palteNumber:string):Promise<Vehicle>
    update(id:string, vehicleIn:VehicleIn):Promise<Vehicle>
    findAll():Promise<Vehicle[]>
}