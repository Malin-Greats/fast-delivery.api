import { EntityNotFoundError, Repository } from "typeorm";
import { IObject } from "../../shared/dto/filter-by.dto";
import AppError from "../../shared/errors/error";
import { NewRideRequest, RideRequestIn } from "../domain/dto/ride-request.dto";
import { RideRequest } from "../domain/ride-request.model";
import { IRideRequestRepository } from "../ports/ride-request/ride-request-repository"

export class RideRequestRepository implements IRideRequestRepository{

    constructor (private ormRepository:Repository<RideRequest>){}

    async delete(filter: IObject): Promise<RideRequest> {
        const request = await this.findBy(filter);
        
        let removed!:RideRequest;
        try {
            if(request){
                removed=await this.ormRepository.remove(request);
            }else{
                throw new AppError("Ride request not found.")
            }
            
        } catch (error) {
            throw error
        }
        return removed;

    }

    async findOneBy(filter: IObject): Promise<RideRequest> {
        let ride;
        try {
            ride =await this.ormRepository.findOneOrFail({
                where: { ...filter.by },} )
        } catch (error ) {
            throw error
        }
        return ride
    }

    async create(requestIn: RideRequestIn): Promise<RideRequest> {
        const newRequest = NewRideRequest(requestIn);
        newRequest
        let savedRequest!:RideRequest
        try {
            const request = await this.ormRepository.create(newRequest);
            savedRequest=await this.ormRepository.save(request)
        } catch (error ) {
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
                throw error
            }
        }
        return  ride
    }
    async findBy(filter: IObject): Promise<RideRequest | null> {
        let filterBy= filter.by
        let ride =  await this.ormRepository.findOne({
                where: { ...filterBy}
            })
        return  ride
    }

    async findAllBy(filter?: IObject): Promise<RideRequest[]> {
        let rideRequests!:RideRequest[]
        try {
            rideRequests =await this.ormRepository.find(
                {
                    where:{...filter?.by}
                }
            )
        } catch (error) {
            throw  error
        }
        return rideRequests
    }
    
}