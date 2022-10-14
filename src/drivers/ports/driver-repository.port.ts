import { Role } from "../../auth/domain/role.model"
import { IObject } from "../../shared/dto/filter-by.dto"
import { Driver } from "../domain/driver.model"
import { DriverIn } from "../domain/dto/driver.dto"

export interface IDriverRepository {
    save(requestIn: DriverIn, role:Role): Promise<Driver>
    findById(id: string): Promise<Driver>
    findBy(filter: IObject): Promise<Driver>
    delete(id: string): Promise<Driver> 
    findAll(): Promise<Driver[]>
    update(id: string, requestIn: IObject): Promise<Driver> 
}