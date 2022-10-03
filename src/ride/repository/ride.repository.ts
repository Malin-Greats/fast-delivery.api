import { EntityNotFoundError, Repository } from "typeorm";
import { IObject } from "../../shared/dto/filter-by.dto";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { NewRide, RideIn } from "../domain/dto/ride.dto";
import {  Ride } from "../domain/ride.model";
import { IRideRepository } from "../ports/ride/ride-repository.port";
import { RideStatus } from "../utils/enums/ride-status.enum";

export class RideRepository implements IRideRepository{

    constructor(private ormRepository:Repository<Ride>){}
    async hasRideWithStatus(...ridesStatus:RideStatus[]):Promise<any>{
        let isTrue = false
        let status:string =''
        for (let st of ridesStatus){
           const found= await this.findOneBy({by:{ride_status:st}})
           if(found!==null && found?.ride_status==st){
                isTrue = true
                status =st
                break
                
           }
        }
        return {"is_true":isTrue, "ride_status":status}
    }
    async findOneBy(filter: IObject): Promise<Ride|null> {
        let ride;
       
        ride =await this.ormRepository.findOne({
            where: { ...filter.by },} )
    
        return ride
    }

    async findAllBy(filter: IObject|null): Promise<Ride[]> {
        let rides;
        try {
            if (filter===null){
                rides =await this.ormRepository.find({
                    relations:{request:false}
                })
            }else{
            rides =await this.ormRepository.find({
                where: { ...filter.by },relations:{request:false}} )
            }
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return rides
    }

    async create(rideIn: RideIn): Promise<Ride> {
        const newRide = NewRide(rideIn);
        let savedRide!:Ride
        try {
            const ride = await this.ormRepository.create(newRide);
            savedRide=await this.ormRepository.save(ride)
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return savedRide
    }

    async update(id: string, requestIn: IObject): Promise<Ride> {
         const ride = await this.findById(id);

        Object.assign(ride, requestIn.by);
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
                where: { id },relations:{request:true}
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
}