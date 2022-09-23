import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { VehicleIn } from "../domain/dto/vehicle.dto";
import { NewVehicle, Vehicle } from "../domain/vehicles.model";
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
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Vehicle> {
        let vehicle!:Vehicle;
        try {
            vehicle =  await this.ormRepository.findOneOrFail({
                where: { id },
                relations: {driver: true,}
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The user with id: ${id} does not exist!`);
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
                throw new AppError(`The user with id: ${driverId} does not exist!`);
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
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Vehicle[]> {
        let vehicles!:Vehicle[]
        try {
            vehicles =await this.ormRepository.find({
                relations: {driver: true}
            })

        } catch (error) {
            logger.error(error)
            throw  error
        }
        return vehicles
    }

}