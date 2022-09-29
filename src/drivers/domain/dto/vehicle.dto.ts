import { Vehicle } from "../vehicles.model"

export interface VehicleIn{
    driver_id:string
    model:string
    make:string
    year:string
    plate_number:string
    color:string
}
export interface VehicleOut{
    id: string
    model:string
    make:string
    year:string
    plate_number:string
    color:string
    created_at:Date
    updated_at:Date
    // driver: Driver
}


export function NewVehicle({model, make,driver_id, year, color, plate_number}:VehicleIn):Vehicle{
    const vehicle = new Vehicle()
    vehicle.model=model
    vehicle.make= make
    vehicle.year=year
    vehicle.color=color
    vehicle.driver_id=driver_id
    vehicle.plate_number=plate_number
    return vehicle
}

export function toVehicleOut({id, make, model, year, plate_number, color, created_at, updated_at}:Vehicle):VehicleOut{
    const  vehicleOut:VehicleOut ={
        id, make, model, year, plate_number, color, created_at, updated_at
    }
    return   vehicleOut
}