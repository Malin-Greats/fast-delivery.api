import { DriverDocuments } from "../domain/driver-docs.model"
import { DriverDocumentsIn } from "../domain/dto/driver-docs.dto"

export interface IDriverDocumentsRepository {
    create(documentsIn:DriverDocumentsIn):Promise<DriverDocuments>
    delete(id:string):Promise<DriverDocuments>
    findByDriverId(driverId:string):Promise<DriverDocuments>
    findById(id:string):Promise<DriverDocuments>
    update(id:string, documentsIn:DriverDocumentsIn):Promise<DriverDocuments>
    findAll():Promise<DriverDocuments[]>
}