import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { NewRideRequest, RideRequestIn } from "../domain/dto/ride-request.dto";
import { RideRequest } from "../domain/ride-request.model";
import { IRideRequestRepository } from "../ports/ride-request-repository";
import { RideRequestStatus } from "../utils/enums/request-status.enum";

export class RideRequestRepository implements IRideRequestRepository{

    constructor (private ormRepository:Repository<RideRequest>){}

    async create(requestIn: RideRequestIn): Promise<RideRequest> {
        const newRideRequest = NewRideRequest(requestIn);
        let savedRideRequest!:RideRequest
        try {
            const user = await this.ormRepository.create(newRideRequest);
            savedRideRequest=await this.ormRepository.save(user)
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return savedRideRequest
    }

    async update(id: string, requestIn: RideRequestIn): Promise<RideRequest> {
        const rideRequest = await this.findById(id);

        Object.assign(rideRequest, requestIn);
        let updatedRequest!:RideRequest
        try {
            updatedRequest=await this.ormRepository.save(rideRequest);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return  updatedRequest
    }
    async hasRequestWithStatus(customer_id:string, request_status:RideRequestStatus):Promise<boolean>{
        const ride =  await this.ormRepository.findOneOrFail({
            where: { customer_id,request_status },} )
        if (!ride){
            return false
        }
        return  true
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
    async findAll(filterBy: string): Promise<RideRequest[]> {
        let rideRequests!:RideRequest[]
        try {
            rideRequests =await this.ormRepository.find()

        } catch (error) {
            logger.error(error)
            throw  error
        }
        return rideRequests
    }
    
}