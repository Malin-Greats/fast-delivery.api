import logger from "../../shared/errors/logger";
import { DriverDocumentsIn, DriverDocumentsOut, toDriverDocumentsOut } from "../domain/dto/driver-docs.dto";
import { IDriverDocumentsRepository } from "../ports/driver-docs-repository.port";
import { IDriverDocumentsService } from "../ports/driver-docs-service.port";

export class DriverDocumentsService  implements IDriverDocumentsService{
    constructor(private _documentsRepository:IDriverDocumentsRepository) {}

    async addDriverDocuments(documentsIn: DriverDocumentsIn): Promise<DriverDocumentsOut> {
       const documents = await this._documentsRepository.create(documentsIn)
       const documentsOut = toDriverDocumentsOut(documents)
       return documentsOut
    }
   
    async findAllDriverDocuments(driverId: string): Promise<DriverDocumentsOut> {
        const documents= await this._documentsRepository.findByDriverId(driverId)
        const documentsOut = toDriverDocumentsOut(documents)
       return documentsOut
    }
    
}