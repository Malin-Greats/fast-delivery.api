import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { NewRide, RideIn } from "../domain/dto/ride.dto";
import {  Ride } from "../domain/ride.model";
import { IRideRepository } from "../ports/ride-repository.port";

export class RideRepository implements IRideRepository{

    constructor(private ormRepository:Repository<Ride>){}

    async create(requestIn: RideIn): Promise<Ride> {
        const newRide = NewRide(requestIn);
        let savedRide!:Ride
        try {
            const user = await this.ormRepository.create(newRide);
            savedRide=await this.ormRepository.save(user)
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return savedRide
    }

    async update(id: string, requestIn: Ride): Promise<Ride> {
         const ride = await this.findById(id);

        Object.assign(ride, requestIn);
        let updatedRide!:Ride
        try {
            updatedRide=await this.ormRepository.save(ride);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return  updatedRide
    }

    async findById(id: string): Promise<Ride> {
        let ride!:Ride;
        try {
            ride =  await this.ormRepository.findOneOrFail({ 
                where: { id }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The ride with id: ${id} does not exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  ride
    }
    
    async findAll(filterBy: string): Promise<Ride[]> {
        let rides!:Ride[]
        try {
            rides =await this.ormRepository.find()

        } catch (error) {
            logger.error(error)
            throw  error
        }
        return rides
    }
}