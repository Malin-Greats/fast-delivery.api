import { Driver } from "../driver.model"
import { Vehicle } from "../vehicles.model"

export interface VehicleIn{
    driver_id:string
    model:string
    make:string
    year:string
    capacity:string
    plate_number:string
    color:string
    vehicle_technical_certificate:string
    vehicle_insurance_registration:string
}
export interface VehicleOut{
    id: string
    model:string
    make:string
    year:string
    capacity:string
    plate_number:string
    color:string
    vehicle_technical_certificate:string
    vehicle_insurance_registration:string
    created_at:Date
    updated_at:Date
    // driver: Driver
}

export function toVehicleOut({id, make, model, year, capacity, plate_number, color, 
    vehicle_insurance_registration, vehicle_technical_certificate, created_at, updated_at}:Vehicle):VehicleOut{
    const  vehicleOut:VehicleOut ={id, make, model, year, capacity, plate_number, color, 
        vehicle_insurance_registration, vehicle_technical_certificate, created_at, updated_at}
    return   vehicleOut
}