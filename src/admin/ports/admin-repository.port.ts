import { Role } from "../../auth/domain/role.model";
import { IObject } from "../../shared/dto/filter-by.dto";
import { Admin } from "../domain/admin.model";
import { AdminIn } from "../domain/dto/admin.dto";

export interface  IAdminRepository{
    save(customerIn:AdminIn,  role:Role):Promise<Admin>
    delete(id:string):Promise<Admin>
    findById(id:string):Promise<Admin>
    findBy(filter:IObject):Promise<Admin>
    findAll():Promise<Admin[]>
    update(id:string , filter:IObject):Promise<Admin>
}