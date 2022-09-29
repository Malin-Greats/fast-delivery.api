import { EntityNotFoundError, Repository } from "typeorm";
import { IFilter, IObject } from "../../shared/dto/filter-by.dto";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { NewRideRequest, RideRequestIn } from "../domain/dto/ride-request.dto";
import { RideRequest } from "../domain/ride-request.model";
import { IRideRequestRepository } from "../ports/ride-request/ride-request-repository";
import { RideRequestStatus } from "../utils/enums/request-status.enum";

export class RideRequestRepository implements IRideRequestRepository{

    constructor (private ormRepository:Repository<RideRequest>){}

    async create(requestIn: RideRequestIn): Promise<RideRequest> {
        const newRequest = NewRideRequest(requestIn);
        let savedRequest!:RideRequest
        try {
            const user = await this.ormRepository.create(newRequest);
            savedRequest=await this.ormRepository.save(user)
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return savedRequest
    }

    async update(id: string, requestIn: IObject): Promise<RideRequest> {
        const rideRequest = await this.findById(id);

        Object.assign(rideRequest, requestIn.by);
        let updatedRequest!:RideRequest
        try {
            updatedRequest=await this.ormRepository.save(rideRequest);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return  updatedRequest
    }


    async findById(id: string): Promise<RideRequest> {
        let ride!:RideRequest;
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
    async findOneBy(filter: IObject): Promise<RideRequest> {
        let ride!:RideRequest;
        let filterBy= filter.by
        try {
            ride =  await this.ormRepository.findOneOrFail({
                where: { ...filterBy}
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The ride_request with attributes "${filter.by}" does not exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  ride
    }

    async findAllBy(filter: IObject): Promise<RideRequest[]> {
        let rideRequests!:RideRequest[]
        const filterBy=filter.by
        try {
            rideRequests =await this.ormRepository.find(
                {
                    where:{...filterBy}
                }
            )
        } catch (error) {
            logger.error(error)
            throw  error
        }
        return rideRequests
    }
    
}