import {Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { IDriverChangeRequestState } from '../../drivers/domain/dto/driver-rides.dto';
import { ApiResponse } from '../../shared/dto/response';
import AppError, { isError } from '../../shared/errors/error';
import { RideRequestIn } from '../domain/dto/ride-request.dto';
import { IRideRequestService } from '../ports/ride-request/ride-request-service.port';

export class RideRequestHandler {

    constructor( private _rideRequestService:IRideRequestService){}

    async sendRideRequest(req:Request, res:Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const apiResponse= new ApiResponse()
        const requestIn=<RideRequestIn>req.body
        console.log(requestIn)

        try {
            apiResponse.data =await this._rideRequestService.createRequest(requestIn)
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

    async acceptRequest(req:Request, res:Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const apiResponse= new ApiResponse()
        const {driver_id, request_id}=<IDriverChangeRequestState>req.body

        try {
            apiResponse.data =await this._rideRequestService.acceptRequest(driver_id, request_id)
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

    async cancelRequest(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const {customer_id}=<{customer_id:string}>req.body

        try {
            apiResponse.data =await this._rideRequestService.cancelRequest(customer_id)
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

    async broadcastPendingRequest(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        try {
            apiResponse.data =await this._rideRequestService.broadcastPendingRequests()
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

    async customerCurrentRequest(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const {customer_id}=<{customer_id:string}>req.body
        try {
            apiResponse.data =await this._rideRequestService.getCustomerCurrentRequest(customer_id)
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