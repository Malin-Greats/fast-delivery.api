import { RoleIn } from "../../auth/dto/role/create-role.dto";
import { UserIn } from "../../auth/dto/user/create-user.dto";
import { IRoleRepository } from "../../auth/ports/role-repository.port";
import { IUserRepository } from "../../auth/ports/user-repository.port";
import { IUserService } from "../../auth/ports/user-service.port";
import logger from "../../shared/errors/logger";
import { DriverIn, DriverOut, toDriverOut } from "../domain/dto/driver.dto";
import { IDriverRepository } from "../ports/driver-repository.port";
import { IDriverService } from "../ports/driver-service.port";

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

    approveDriver(driverId: string): Promise<DriverOut> {
        throw new Error("Method not implemented.");
    }
    
}