import { IObject } from "../../shared/dto/filter-by.dto"
import { DriverDocumentsIn, DriverDocumentsOut } from "../domain/dto/driver-docs.dto"

export interface IDriverDocumentsService{
    addDocuments(documentsIn:DriverDocumentsIn):Promise<DriverDocumentsOut>
    updateDocuments(filter: IObject, documentsIn:DriverDocumentsIn):Promise<DriverDocumentsOut>
    deleteDocuments(filter: IObject):Promise<DriverDocumentsOut>
    findDocumentsByDriverId(driverId:string):Promise<DriverDocumentsOut>
    findAllDocuments():Promise<DriverDocumentsOut[]>
    findDocumentsBy(filter: IObject):Promise<DriverDocumentsOut>
}