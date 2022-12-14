import { IRideService } from "../ports/ride/ride-service.port";
import {Request, Response } from 'express';
import { ApiResponse } from "../../shared/dto/response";
import AppError, { isError } from "../../shared/errors/error";
import { CancelledRideIn } from "../domain/dto/cancelled-ride-request.dto";
import { getPayload } from "../../shared/http/get-payload";
import { Payload } from "../../shared/jwt.util";

export class RidesHandler {

    constructor(private _rideService:IRideService){}

    async findAllRides(req:Request, res:Response){
        const apiResponse= new ApiResponse()
            const customer_id = req.query.customerId
            const driver_id = req.query.driverId
            try {
                if (customer_id){
                    apiResponse.data =await this._rideService.findAllRidesBy({by:{customer_id}})
                }else if(driver_id){
                    apiResponse.data =await this._rideService.findAllRidesBy({by:{driver_id}})
                }else {
                    apiResponse.data =await this._rideService.findAllRidesBy(null)
                }
                apiResponse.success =true
            } catch (error) {
                if (isError(error)){
                    apiResponse.errors= new AppError(error.message,error.detail, 400)
                    return res.status(apiResponse.errors.statusCode).json(apiResponse)
                }
                return res.status(500).json(error)
            }
        return res.status(200).json(apiResponse)
    }

    async myRides(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const {role, userId} = <Payload>await getPayload(req, res)

            try {
                if(role =="customer"){
                    apiResponse.data =await this._rideService.findAllRidesBy({by:{customer_id:userId}})
                    apiResponse.success =true
                }else if(role =="driver"){
                    apiResponse.data =await this._rideService.findAllRidesBy({by:{driver_id:userId}})
                    apiResponse.success =true
                }
            } catch (error) {
                if (isError(error)){
                    apiResponse.errors= new AppError(error.message,error.detail, 400)
                    return res.status(apiResponse.errors.statusCode).json(apiResponse)
                }
                return res.status(500).json(error)
            }
        return res.status(200).json(apiResponse)
    }

    async findRideById(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const rideID=<string>req.params.rideId

        try {
            apiResponse.data =await this._rideService.findRideById(rideID)
            apiResponse.success =true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                return res.status(apiResponse.errors.statusCode).json(apiResponse)
            }
            return res.status(500).json(error)
        }
        return res.status(200).json(apiResponse)
    }

    async cancelRide(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const cancelledRide=<CancelledRideIn>req.body
        const {role} = <Payload>await getPayload(req, res)
        cancelledRide.cancelled_by =role

        try {
            apiResponse.data =await this._rideService.cancelRide(cancelledRide)
            apiResponse.success =true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                return res.status(apiResponse.errors.statusCode).json(apiResponse)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(apiResponse)
    }

    async startRide(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const {ride_id}=<{ride_id:string}>req.body
        const {userId} = <Payload>await getPayload(req, res)

        try {
            apiResponse.data =await this._rideService.startRide(ride_id)
            apiResponse.success =true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                return res.status(apiResponse.errors.statusCode).json(apiResponse)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(apiResponse)
    }

    async stopRide(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const {ride_id}=<{ride_id:string}>req.body
        const {userId} = <Payload>await getPayload(req, res)

        try {
            apiResponse.data =await this._rideService.stopRide(ride_id)
            apiResponse.success =true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                return res.status(apiResponse.errors.statusCode).json(apiResponse)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(apiResponse)
    }

    async veriyRideDestination(req:Request, res:Response){

    }

    async payRideCommision(req:Request, res:Response){
    }

    async currentRide(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const {userId, role} = <Payload>await getPayload(req, res)
            try {
                if(role ==="customer"){
                    apiResponse.data =await this._rideService.currentRide({by:{customer_id:userId}})
                    apiResponse.success =true
                }else if(role ==="driver"){
                    apiResponse.data =await this._rideService.currentRide({by:{driver_id:userId}})
                    apiResponse.success =true  
                }

            } catch (error) {
                if (isError(error)){
                    apiResponse.errors= new AppError(error.message,error.detail, 400)
                    return res.status(apiResponse.errors.statusCode).json(apiResponse)
                }
                return res.status(500).json(error)
            }
        return res.status(201).json(apiResponse)
    }

    async payForRide(req:Request, res:Response){
        const apiResponse= new ApiResponse()
            const {ride_id, customer_id}=<{ride_id:string, customer_id:string}>req.body
            try {
                apiResponse.data =await this._rideService.payForRide(customer_id, ride_id)
                apiResponse.success =true
            } catch (error) {
                if (isError(error)){
                    apiResponse.errors= new AppError(error.message,error.detail, 400)
                    return res.status(apiResponse.errors.statusCode).json(apiResponse)
                }
                return res.status(500).json(error)
            }
        return res.status(201).json(apiResponse)
    }

}