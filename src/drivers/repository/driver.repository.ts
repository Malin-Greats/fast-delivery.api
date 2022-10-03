import { EntityNotFoundError, Repository } from "typeorm";
import { Role } from "../../auth/domain/role.model";
import { IObject } from "../../shared/dto/filter-by.dto";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { Driver } from "../domain/driver.model";
import { DriverIn, NewDriver } from "../domain/dto/driver.dto";
import { IDriverRepository } from "../ports/driver-repository.port";

export class DriverRepository implements IDriverRepository{

    constructor(private ormRepository:Repository<Driver>){}

    async save(requestIn: DriverIn, role:Role): Promise<Driver> {
        const newDriver = await NewDriver(requestIn);
        newDriver.role = role
        // const [ newVehicle, newDocuments] = await Promise.all( [
        //     NewVehicle(requestIn),
        //     NewDriverDocuments(requestIn)])
        // newDriver.vehicles.push(newVehicle)
        // newDriver.documents = newDocuments
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

    async findById(id: string): Promise<Driver> {
        let driver!:Driver;
        try {
            driver =  await this.ormRepository.findOneOrFail({
                where: { id }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The driver with id: ${id} does not exist!`);
            }else{
                throw error
            }
        }
        return  driver
    }

    async findBy(filter: IObject): Promise<Driver> {
        let driver!:Driver;
        let filterBy= filter.by
        driver =  await this.ormRepository.findOneOrFail({
                where: { ...filterBy}
            })
        return  driver
    }
    
    async delete(id: string): Promise<Driver> {
        const driver = await this.findById(id);
        let removed!:Driver;
        try {
            removed=await this.ormRepository.remove(driver);
        } catch (error) {
            throw error
        }
        return removed;
    }

    async findAll(): Promise<Driver[]> {
        let drivers!:Driver[]
        try {
            drivers =await this.ormRepository.find()
        } catch (error) {
            throw  error
        }
        return drivers
    }

    async update(id: string, requestIn: IObject): Promise<Driver> {
        const driver = await this.findById(id);
        Object.assign(driver, requestIn.by);
        let updated!:Driver
        try {
            updated=await this.ormRepository.save(driver);
        } catch (error) {
            throw error
        }
        return  updated
    }
}

