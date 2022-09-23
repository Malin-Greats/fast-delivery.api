import { DriverDocuments } from "../domain/driver-docs.model"
import { DriverDocumentsIn } from "../domain/dto/driver-docs.dto"

export interface IDriverDocumentsRepository {
    create(documentsIn:DriverDocumentsIn):Promise<DriverDocuments>
    delete(driverId:string):Promise<DriverDocuments>
    findByDriverId(driverId:string):Promise<DriverDocuments>
    update(driverId:string, documentsIn:DriverDocumentsIn):Promise<DriverDocuments>
    findAll():Promise<DriverDocuments[]>
}