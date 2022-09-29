import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { CancelledRide } from "../domain/cancelled-ride-request.model";
import { CancelledRideIn, NewCancelledRide } from "../domain/dto/cancelled-ride-request.dto";
import { ICancelledRideRepository } from "../ports/cancelled-ride/cancelled-ride-repository";


export class CancelledRideRepository implements ICancelledRideRepository{
    constructor (private ormRepository:Repository<CancelledRide>){}

    async create(requestIn: CancelledRideIn): Promise<CancelledRide> {
        const newRideRequest = NewCancelledRide(requestIn);
        let cancelledRideRequest!:CancelledRide
        try {
            const user = await this.ormRepository.create(newRideRequest);
            cancelledRideRequest=await this.ormRepository.save(user)
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return cancelledRideRequest
    }

    async update(id: string, requestIn: CancelledRideIn): Promise<CancelledRide> {
        const cancelledRideRequest = await this.findById(id);

        Object.assign(cancelledRideRequest, requestIn);
        let updatedRequest!:CancelledRide
        try {
            updatedRequest=await this.ormRepository.save(cancelledRideRequest);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return  updatedRequest
    }

    async findById(id: string): Promise<CancelledRide> {
        let cancelledRideRequest!:CancelledRide;
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

    async findAll(filterBy: string): Promise<CancelledRide[]> {
        let cancelledRideRequests!:CancelledRide[]
        try {
            cancelledRideRequests =await this.ormRepository.find()

        } catch (error) {
            logger.error(error)
            throw  error
        }
        return cancelledRideRequests
    }


}