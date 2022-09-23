import { DriverDocumentsIn, DriverDocumentsOut } from "../domain/dto/driver-docs.dto"

export interface IDriverDocumentsService{
    addDriverDocuments(documentsIn:DriverDocumentsIn):Promise<DriverDocumentsOut>
    findAllDriverDocuments(driverId:string):Promise<DriverDocumentsOut>
}