import { EntityNotFoundError, Repository } from "typeorm";
import { IObject } from "../../shared/dto/filter-by.dto";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { NewVehicle, VehicleIn } from "../domain/dto/vehicle.dto";
import {  Vehicle } from "../domain/vehicles.model";
import { IVehicleRepository } from "../ports/vehicle-repository.port";

export class VehicleRepository implements IVehicleRepository{

    constructor(private ormRepository:Repository<Vehicle>){}

    async create(vehicleIn: VehicleIn): Promise<Vehicle> {
        const newVehicle = NewVehicle(vehicleIn);

       const vehicle = await this.ormRepository.create(newVehicle);

       let savedVehicle!:Vehicle
       try {
        savedVehicle=await this.ormRepository.save(vehicle)
       } catch (error ) {
           logger.error(error)
           throw error
       }
       return savedVehicle
    }

    async delete(id: string): Promise<Vehicle> {
        const vehicle = await this.findById(id);
        let removed!:Vehicle;
        try {
            removed=await this.ormRepository.remove(vehicle);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return removed;
    }

    async findById(id: string): Promise<Vehicle> {
        let vehicle!:Vehicle;
        try {
            vehicle =  await this.ormRepository.findOneOrFail({
                where: { id }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The vehicle with id: ${id} does not exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  vehicle
    }

    async findByDriverId(driverId: string): Promise<Vehicle[]> {
        let vehicles!:Vehicle[];
        try {
            vehicles =  await this.ormRepository.find({
                where: { driver_id:driverId }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`No vehicles added yet!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  vehicles
    }
    async findByPlateNumber(palteNumber: string): Promise<Vehicle> {
        throw new Error("Method not implemented.");
    }

    async update(id: string, vehicleIn: VehicleIn): Promise<Vehicle> {
        const vehicle = await this.findById(id);
        Object.assign(vehicle, vehicleIn);
        let updated!:Vehicle
        try {
            updated=await this.ormRepository.save(vehicle);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return  updated
    }

    async findAll(): Promise<Vehicle[]> {
        let vehicles!:Vehicle[]
        try {
            vehicles =await this.ormRepository.find()

        } catch (error) {
            logger.error(error)
            throw  error
        }
        return vehicles
    }

    async findBy(filter: IObject): Promise<Vehicle> {
        let vehicle!:Vehicle;
            let vehicles!:Vehicle[];
            try {
                vehicle =  await this.ormRepository.findOneOrFail({
                    where: { ...filter.by}
                })
            } catch (error) {
                if (error instanceof EntityNotFoundError){
                    throw new AppError(`Vehicle doesnt exist !`);
                }else{
                    logger.error(error)
                    throw error
                }
            }
        return  vehicle
    }
  
}