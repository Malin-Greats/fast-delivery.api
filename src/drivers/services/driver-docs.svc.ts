import { IObject } from "../../shared/dto/filter-by.dto";
import { DriverDocumentsIn, DriverDocumentsOut, toDriverDocumentsOut } from "../domain/dto/driver-docs.dto";
import { IDriverDocumentsRepository } from "../ports/driver-docs-repository.port";
import { IDriverDocumentsService } from "../ports/driver-docs-service.port";

export class DriverDocumentsService  implements IDriverDocumentsService{

    constructor(private _documentsRepository:IDriverDocumentsRepository) {}

    async findDocumentsBy(filter: IObject): Promise<DriverDocumentsOut> {
        const documents = await this._documentsRepository.findBy(filter)
        const documentsOut = toDriverDocumentsOut(documents)
        return documentsOut
    }

    async addDocuments(documentsIn: DriverDocumentsIn): Promise<DriverDocumentsOut> {
        const documents = await this._documentsRepository.create(documentsIn)
        const documentsOut = toDriverDocumentsOut(documents)
        return documentsOut
    }
    async updateDocuments(filter: IObject, documentsIn: IObject): Promise<DriverDocumentsOut> {
        const documents = await this._documentsRepository.update(filter, documentsIn)
        const documentsOut = toDriverDocumentsOut(documents)
        return documentsOut
    }
    async deleteDocuments(filter: IObject): Promise<DriverDocumentsOut> {
        const documents = await this._documentsRepository.delete(filter)
        const documentsOut = toDriverDocumentsOut(documents)
        return documentsOut
    }
    async findDocumentsByDriverId(driverId: string): Promise<DriverDocumentsOut> {
        const documents= await this._documentsRepository.findByDriverId(driverId)
        const documentsOut = toDriverDocumentsOut(documents)
       return documentsOut
    }
    async findAllDocuments(filter?: IObject): Promise<DriverDocumentsOut[]> {
        const documents= await this._documentsRepository.findAll(filter)
        const docsOut:DriverDocumentsOut[]=[]
        for (let doc of documents){
            const documentsOut = toDriverDocumentsOut(doc)
            docsOut.push(doc)
        }
       return docsOut
    }

   

}