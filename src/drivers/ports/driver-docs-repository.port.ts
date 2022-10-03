import { IObject } from "../../shared/dto/filter-by.dto"
import { DriverDocuments } from "../domain/driver-docs.model"
import { DriverDocumentsIn } from "../domain/dto/driver-docs.dto"

export interface IDriverDocumentsRepository {
    create(documentsIn:DriverDocumentsIn):Promise<DriverDocuments>
    delete(filter: IObject):Promise<DriverDocuments>
    findByDriverId(driverId:string):Promise<DriverDocuments>
    findById(id:string):Promise<DriverDocuments>
    update(filter: IObject, documentsIn:DriverDocumentsIn):Promise<DriverDocuments>
    findAll():Promise<DriverDocuments[]>
    findBy(filter: IObject):Promise<DriverDocuments>
}