import { EntityNotFoundError, Repository } from "typeorm";
import { User } from "../../auth/domain/user.model";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { Driver, NewDriver } from "../domain/driver.model";
import { DriverIn } from "../domain/dto/driver.dto";
import { IDriverRepository } from "../ports/driver-repository.port";

export class DriverRepository implements IDriverRepository{

    constructor(private ormRepository:Repository<Driver>){}

    async create(driverIn: DriverIn, user:User): Promise<Driver> {
        const newDriver = NewDriver();
        newDriver.user =user
        const driver = await this.ormRepository.create(newDriver);

        let saved!:Driver
        try {
            saved=await this.ormRepository.save(driver)
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return saved
    }

    async delete(id: string): Promise<Driver> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Driver> {
         let driver!:Driver;
        try {
            driver =  await this.ormRepository.findOneOrFail({ 
                where: { id },
                relations: { user:true}
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The driver with id: ${id} does not exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  driver
    }
    
    async update(id: string, driverIn: DriverIn): Promise<Driver> {
        throw new Error("Method not implemented.");
    }
    
    async findAll(): Promise<Driver[]> {
        let drivers!:Driver[]
        try {
            drivers =await this.ormRepository.find({
                relations: { user:true}
            })

        } catch (error) {
            logger.error(error)
            throw  error
        }
        return drivers
    }

}