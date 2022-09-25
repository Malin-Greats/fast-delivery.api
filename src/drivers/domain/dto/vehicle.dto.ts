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


export function NewVehicle({model, make,capacity, driver_id, vehicle_insurance_registration, 
    vehicle_technical_certificate, year, color, plate_number}:VehicleIn):Vehicle{
    const vehicle = new Vehicle()
    vehicle.model=model
    vehicle.make= make
    vehicle.year=year
    vehicle.color=color
    vehicle.capacity=capacity
    vehicle.driver_id=driver_id
    vehicle.plate_number=plate_number
    vehicle.vehicle_technical_certificate =vehicle_technical_certificate
    vehicle.vehicle_insurance_registration=vehicle_insurance_registration
    return vehicle
}

export function toVehicleOut({id, make, model, year, capacity, plate_number, color, 
    vehicle_insurance_registration, vehicle_technical_certificate, created_at, updated_at}:Vehicle):VehicleOut{
    const  vehicleOut:VehicleOut ={id, make, model, year, capacity, plate_number, color, 
        vehicle_insurance_registration, vehicle_technical_certificate, created_at, updated_at}
    return   vehicleOut
}