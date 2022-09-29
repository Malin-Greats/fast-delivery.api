import { DriverIn, DriverOut, IDriverApprovalStatus as ApprovalStatusObj  } from "../domain/dto/driver.dto"
import { DriverApprovalStatus as ApprovalStatus } from "../utilts/enums/driver-approval-status.enum"

export interface IDriverService{
    registerDriver(driverIn:DriverIn):Promise<DriverOut>
    findDriverById(id:string):Promise<DriverOut>
    findAllDrivers(filterBy:string):Promise<DriverOut[]>
    approveDriver(driverId: string): Promise<ApprovalStatus>
    rejectDriver(driverId: string): Promise<ApprovalStatus>
    approvalStatus(driverId:string):Promise<ApprovalStatusObj>
}