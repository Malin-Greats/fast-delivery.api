import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { RideRequestCancelled } from "../domain/cancelled-ride-request.model";
import { RideRequestCancelledIn } from "../domain/dto/cancelled-ride-request.dto";
import { NewRideRequest } from "../domain/dto/ride-request.dto";
import { IRideRequestCancelledRepository } from "../ports/cancelled-request-repository";

export class RideRequestCancelledRepository implements IRideRequestCancelledRepository{
    constructor (private ormRepository:Repository<RideRequestCancelled>){}

    async create(requestIn: RideRequestCancelledIn): Promise<RideRequestCancelled> {
        const newRideRequest = NewRideRequest(requestIn);
        let savedRideRequest!:RideRequestCancelled
        try {
            const user = await this.ormRepository.create(newRideRequest);
            savedRideRequest=await this.ormRepository.save(user)
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return savedRideRequest
    }

    async update(id: string, requestIn: RideRequestCancelledIn): Promise<RideRequestCancelled> {
        const rideRequest = await this.findById(id);

        Object.assign(rideRequest, requestIn);
        let updatedRequest!:RideRequestCancelled
        try {
            updatedRequest=await this.ormRepository.save(rideRequest);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return  updatedRequest
    }

    async findById(id: string): Promise<RideRequestCancelled> {
        let ride!:RideRequestCancelled;
        try {
            ride =  await this.ormRepository.findOneOrFail({ 
                where: { id }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The ride_request with id: ${id} does not exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  ride
    }
    async findAll(filterBy: string): Promise<RideRequestCancelled[]> {
        let rideRequests!:RideRequestCancelled[]
        try {
            rideRequests =await this.ormRepository.find()

        } catch (error) {
            logger.error(error)
            throw  error
        }
        return rideRequests
    }
    

}