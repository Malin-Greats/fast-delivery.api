import { DriverDocumentsIn, DriverDocumentsOut } from "../domain/dto/driver-docs.dto"

export interface IDriverDocumentsService{
    addDocuments(documentsIn:DriverDocumentsIn):Promise<DriverDocumentsOut>
    updateDocuments(id:string, documentsIn:DriverDocumentsIn):Promise<DriverDocumentsOut>
    deleteDocuments(id:string):Promise<DriverDocumentsOut>
    findDocumentsByDriverId(driverId:string):Promise<DriverDocumentsOut>
    findAllDocuments():Promise<DriverDocumentsOut[]>
}