import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { DriverDocuments } from "../domain/driver-docs.model";
import { DriverDocumentsIn, NewDriverDocuments } from "../domain/dto/driver-docs.dto";
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
            throw error
       }
       return savedDocumemts
    }

    async delete(id: string): Promise<DriverDocuments> {
        const documents = await this.findById(id);
        let removed!:DriverDocuments;
        try {
            removed=await this.ormRepository.remove(documents);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return removed;
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

    async findById(id: string): Promise<DriverDocuments> {
        let documents!:DriverDocuments;
        try {
            documents =  await this.ormRepository.findOneOrFail({ 
                where: { id }})
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The documents with id: ${id} does not exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  documents
    }
    async update(id: string, documentsIn: DriverDocumentsIn): Promise<DriverDocuments> {
            const documents = await this.findById(id);
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