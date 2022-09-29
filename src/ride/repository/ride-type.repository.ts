import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { NewRideType, RideTypeIn } from "../domain/dto/ride-type.model";
import { RideType } from "../domain/ride-type.model";
import { IRideTypeRepository } from "../ports/ride-type/ride-type-repository.port";

export class RideTypeRepository implements IRideTypeRepository{
    
    constructor(private ormRepository:Repository<RideType>){}
 
    async create(rideTypeIn: RideTypeIn): Promise<RideType> {
        const newType = NewRideType(rideTypeIn);
       let saved!:RideType
       try {
           const user = await this.ormRepository.create(newType);
           saved=await this.ormRepository.save(user)
       } catch (error ) {
           logger.error(error)
           throw error
       }
       return saved
    }

    async update(id: string, rideTypeIn: RideTypeIn): Promise<RideType> {
        const type = await this.findById(id);
        Object.assign(type, rideTypeIn);
        let updatedType!:RideType
        try {
            updatedType=await this.ormRepository.save(type);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return  updatedType
    }
    async delete(id: string): Promise<RideType> {
        const type = await this.findById(id);
        let removedType!:RideType;
        try {
            removedType=await this.ormRepository.remove(type);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return removedType;
    }

    async findById(id: string): Promise<RideType> {
        let type!:RideType;
        try {
            type =  await this.ormRepository.findOneOrFail({ where: { id }})
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The ride type with id: ${id} does not exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  type
    }

    async findAll(): Promise<RideType[]> {
        let types!:RideType[]
        try {
            types =await this.ormRepository.find()
        } catch (error) {
            logger.error(error)
            throw  error
        }
        return types
    }

}






