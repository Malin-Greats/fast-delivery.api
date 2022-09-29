import { UserIn } from "../../auth/domain/dto/user/user.dto";
import { IRoleRepository } from "../../auth/ports/role-repository.port";
import { IUserRepository } from "../../auth/ports/user-repository.port";
import logger from "../../shared/errors/logger";
import { DriverIn, DriverOut, IDriverApprovalStatus, toDriverOut } from "../domain/dto/driver.dto";
import { IDriverRepository } from "../ports/driver-repository.port";
import { IDriverService } from "../ports/driver-service.port";
import { DriverApprovalStatus } from "../utilts/enums/driver-approval-status.enum";

export class DriverService implements IDriverService{

    constructor(private _driverRepository:IDriverRepository, private _userRepository:IUserRepository, private _roleRepository:IRoleRepository){}

    async registerDriver(driverIn: DriverIn): Promise<DriverOut> {
        const userIn:UserIn=driverIn as UserIn
        const role= await this._roleRepository.findByName(driverIn.role)
        const user=await this._userRepository.create(userIn, role)
       const driver = await this._driverRepository.create(driverIn, user)
        const driverOut = toDriverOut(driver)
       return driverOut
    }
    
    async findDriverById(id: string): Promise<DriverOut> {
        const driver= await this._driverRepository.findById(id)
        const driverOut= toDriverOut(driver)
        return driverOut
    }

    async findAllDrivers(filterBy: string): Promise<DriverOut[]> {
        const drivers= await this._driverRepository.findAll()
        let driversOut:DriverOut[]=[];
        for (let driver of drivers){
            const driverOut= toDriverOut(driver)
            logger.info(driverOut)
            driversOut.push(driverOut)
        }
        return driversOut
    }

    async approveDriver(driverId: string): Promise<DriverApprovalStatus> {
        const aprovalStatus = {approval_status:DriverApprovalStatus.APPROVED}
        const driver = await this._driverRepository.update(driverId, aprovalStatus)
        return driver.approval_status
    }
    async rejectDriver(driverId: string): Promise<DriverApprovalStatus> {
        const aprovalStatus = {approval_status:DriverApprovalStatus.REJECTED}
        const driver = await this._driverRepository.update(driverId, aprovalStatus)
        return driver.approval_status
    }

    async approvalStatus(driverId:string):Promise<IDriverApprovalStatus>{
       const driver= await this._driverRepository.findById(driverId)
       const aprovalStatus:IDriverApprovalStatus={approval_status: driver.approval_status, is_approved:false}
       if (driver.approval_status==DriverApprovalStatus.APPROVED){
        aprovalStatus.is_approved=true
       }
       return aprovalStatus
    }
}