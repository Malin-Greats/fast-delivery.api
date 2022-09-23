import { DriverIn, DriverOut } from "../domain/dto/driver.dto"

export interface IDriverService{
    registerDriver(driverIn:DriverIn):Promise<DriverOut>
    findDriverById(id:string):Promise<DriverOut>
    findAllDrivers(filterBy:string):Promise<DriverOut[]>
    approveDriver(driverId:string):Promise<DriverOut>
}