import logger from "../../shared/errors/logger";
import { DriverDocumentsIn, DriverDocumentsOut, toDriverDocumentsOut } from "../domain/dto/driver-docs.dto";
import { IDriverDocumentsRepository } from "../ports/driver-docs-repository.port";
import { IDriverDocumentsService } from "../ports/driver-docs-service.port";

export class DriverDocumentsService  implements IDriverDocumentsService{

    constructor(private _documentsRepository:IDriverDocumentsRepository) {}

    async addDocuments(documentsIn: DriverDocumentsIn): Promise<DriverDocumentsOut> {
        const documents = await this._documentsRepository.create(documentsIn)
        const documentsOut = toDriverDocumentsOut(documents)
        return documentsOut
    }
    async updateDocuments(id:string, documentsIn: DriverDocumentsIn): Promise<DriverDocumentsOut> {
        const documents = await this._documentsRepository.update(id, documentsIn)
        const documentsOut = toDriverDocumentsOut(documents)
        return documentsOut
    }
    async deleteDocuments(id: string): Promise<DriverDocumentsOut> {
        const documents = await this._documentsRepository.delete(id)
        const documentsOut = toDriverDocumentsOut(documents)
        return documentsOut
    }
    async findDocumentsByDriverId(driverId: string): Promise<DriverDocumentsOut> {
        const documents= await this._documentsRepository.findByDriverId(driverId)
        const documentsOut = toDriverDocumentsOut(documents)
       return documentsOut
    }
    async findAllDocuments(): Promise<DriverDocumentsOut[]> {
        const documents= await this._documentsRepository.findAll()
        const docsOut:DriverDocumentsOut[]=[]
        for (let doc of documents){
            const documentsOut = toDriverDocumentsOut(doc)
            docsOut.push(doc)
        }
       return docsOut
    }

}