import {Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { ApiResponse } from '../../shared/dto/response';
import AppError, { isError } from '../../shared/errors/error';
import { CancelledRideIn } from '../domain/dto/cancelled-ride-request.dto';
import { ICancelledRideService } from '../ports/cancelled-ride/cancelled-ride-service.port';

export class CancelledRidesHandler {

    constructor( private _cancelledRidesServices:ICancelledRideService){}

    async cancelRide(req:Request, res:Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const apiResponse= new ApiResponse()
        const requestIn=<CancelledRideIn>req.body

        try {
            apiResponse.data =await this._cancelledRidesServices.cancelRide(requestIn)
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