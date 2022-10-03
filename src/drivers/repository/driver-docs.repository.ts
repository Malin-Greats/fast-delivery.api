import { EntityNotFoundError, Repository } from "typeorm";
import { IObject } from "../../shared/dto/filter-by.dto";
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
            const {code} =error as {code:string}
            if (code==="23505"){
                throw new AppError("Aready upload documents")
            }
            throw error
       }
       return savedDocumemts
    }

    async delete(filter: IObject): Promise<DriverDocuments> {
        const documents = await this.findBy(filter);
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
                throw  new AppError(`No documents exist!`);
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
                throw new AppError(`No documents exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  documents
    }
    async update(filter: IObject, documentsIn: DriverDocumentsIn): Promise<DriverDocuments> {
            const documents = await this.findBy(filter);
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

    async findBy(filter: IObject): Promise<DriverDocuments> {
        let vehicle!:DriverDocuments;
        let filterBy= filter.by
        try {
            vehicle =  await this.ormRepository.findOneOrFail({
                where: { ...filterBy}
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`No documents exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        
        return  vehicle
    }

}