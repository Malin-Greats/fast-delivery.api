import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { RideRequestCancelled } from "../domain/cancelled-ride-request.model";
import { NewRideRequestCancelled, RideRequestCancelledIn } from "../domain/dto/cancelled-ride-request.dto";
import { NewRideRequest } from "../domain/dto/ride-request.dto";
import { IRideRequestCancelledRepository } from "../ports/cancelled-request-repository";

export class RideRequestCancelledRepository implements IRideRequestCancelledRepository{
    constructor (private ormRepository:Repository<RideRequestCancelled>){}

    async create(requestIn: RideRequestCancelledIn): Promise<RideRequestCancelled> {
        const newRideRequest = NewRideRequestCancelled(requestIn);
        let cancelledRideRequest!:RideRequestCancelled
        try {
            const user = await this.ormRepository.create(newRideRequest);
            cancelledRideRequest=await this.ormRepository.save(user)
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return cancelledRideRequest
    }

    async update(id: string, requestIn: RideRequestCancelledIn): Promise<RideRequestCancelled> {
        const cancelledRideRequest = await this.findById(id);

        Object.assign(cancelledRideRequest, requestIn);
        let updatedRequest!:RideRequestCancelled
        try {
            updatedRequest=await this.ormRepository.save(cancelledRideRequest);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return  updatedRequest
    }

    async findById(id: string): Promise<RideRequestCancelled> {
        let cancelledRideRequest!:RideRequestCancelled;
        try {
            cancelledRideRequest =  await this.ormRepository.findOneOrFail({
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
        return  cancelledRideRequest
    }
    async findAll(filterBy: string): Promise<RideRequestCancelled[]> {
        let cancelledRideRequests!:RideRequestCancelled[]
        try {
            cancelledRideRequests =await this.ormRepository.find()

        } catch (error) {
            logger.error(error)
            throw  error
        }
        return cancelledRideRequests
    }


}