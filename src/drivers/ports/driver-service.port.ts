import { IObject } from "../../shared/dto/filter-by.dto"
import { DriverIn, DriverOut, IDriverApprovalStatus as ApprovalStatusObj  } from "../domain/dto/driver.dto"
import { DriverApprovalStatus as ApprovalStatus } from "../utilts/enums/driver-approval-status.enum"

export interface IDriverService{
    registerDriver(driverIn:DriverIn):Promise<DriverOut>
    updateDriver(id:string, requestIn:IObject):Promise<DriverOut>
    deleteDriver(id:string):Promise<DriverOut>
    registerDriver(driverIn:DriverIn):Promise<DriverOut>
    findDriverById(id:string):Promise<DriverOut>
    findAllDrivers(filterBy:string):Promise<DriverOut[]>
    approveDriver(driverId: string): Promise<ApprovalStatus>
    rejectDriver(driverId: string): Promise<ApprovalStatus>
    approvalStatus(driverId:string):Promise<ApprovalStatusObj>
}