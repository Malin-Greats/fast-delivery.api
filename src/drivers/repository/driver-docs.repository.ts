import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { DriverDocuments, NewDriverDocuments } from "../domain/driver-docs.model";
import { DriverDocumentsIn } from "../domain/dto/driver-docs.dto";
import { IDriverDocumentsRepository } from "../ports/driver-docs-repository.port";

export class DriverDocumentsRepository implements IDriverDocumentsRepository{

    constructor(private ormRepository:Repository<DriverDocuments>){}

    async create(documentsIn: DriverDocumentsIn): Promise<DriverDocuments> {
        const newDocuments = NewDriverDocuments(documentsIn);
 
       const documents = await this.ormRepository.create(newDocuments);

       let savedDocumemts!:DriverDocuments
       try {
        savedDocumemts=await this.ormRepository.save(documents)
       } catch (error ) {
            if (error instanceof EntityNotFoundError){
                this.update(documentsIn.driver_id, documentsIn)
            }else{
                throw error
            }
       }
       return savedDocumemts
    }

    async delete(driverId: string): Promise<DriverDocuments> {
        throw new Error("Method not implemented.");
    }


    async findByDriverId(driverId: string): Promise<DriverDocuments> {
        let documents!:DriverDocuments;
        try {
            documents =  await this.ormRepository.findOneOrFail({ 
                where: { driver_id:driverId }})
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The documents fot the driver with id: ${driverId} does not exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  documents
    }
    async update(driverId: string, documentsIn: DriverDocumentsIn): Promise<DriverDocuments> {
            const documents = await this.findByDriverId(driverId);
    
            Object.assign(documents, documentsIn);
            let updateDocuments!:DriverDocuments
            try {
                updateDocuments=await this.ormRepository.save(documents);
            } catch (error) {
                logger.error(error)
                throw error
            }
            return  updateDocuments
        
    }

    async findAll(): Promise<DriverDocuments[]> {
        let documents!:DriverDocuments[]
        try {
            documents =await this.ormRepository.find()

        } catch (error) {
            logger.error(error)
            throw  error
        }
        return documents
    }

}