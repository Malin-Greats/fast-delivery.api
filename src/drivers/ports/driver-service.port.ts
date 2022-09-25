import { DriverApprovalStatus } from "../domain/driver.model"
import { DriverIn, DriverOut, IDriverApprovalStatus } from "../domain/dto/driver.dto"

export interface IDriverService{
    registerDriver(driverIn:DriverIn):Promise<DriverOut>
    findDriverById(id:string):Promise<DriverOut>
    findAllDrivers(filterBy:string):Promise<DriverOut[]>
    approveDriver(driverId: string): Promise<DriverApprovalStatus>
    rejectDriver(driverId: string): Promise<DriverApprovalStatus>
    approvalStatus(driverId:string):Promise<IDriverApprovalStatus>
}