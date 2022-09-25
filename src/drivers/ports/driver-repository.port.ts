import { User } from "../../auth/domain/user.model"
import { Driver } from "../domain/driver.model"
import { DriverIn, IDriverApproval } from "../domain/dto/driver.dto"

export interface IDriverRepository {
    create(driverIn:DriverIn, user:User):Promise<Driver>
    delete(id:string):Promise<Driver>
    findById(id:string):Promise<Driver>
    update(id:string, driverIn:DriverIn|IDriverApproval):Promise<Driver>
    findAll():Promise<Driver[]>
}