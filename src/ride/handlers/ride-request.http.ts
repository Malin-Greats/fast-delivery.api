import {Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { ApiResponse } from '../../shared/dto/response';
import AppError, { isError } from '../../shared/errors/error';
import { getPayload } from '../../shared/http/get-payload';
import {  Payload } from '../../shared/jwt.util';
import { RideRequestIn } from '../domain/dto/ride-request.dto';
import { IRideRequestService } from '../ports/ride-request/ride-request-service.port';

export class RideRequestHandler {

    constructor( private _rideRequestService:IRideRequestService){}

    async sendRequest(req:Request, res:Response){
        const errors = validationResult(req);
        const apiResponse= new ApiResponse()
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success:false });
        }
        const {userId} = <Payload>await getPayload(req, res)
        const requestIn=<RideRequestIn>req.body
        requestIn.customer_id = userId

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
        const {userId} = <Payload>await getPayload(req, res)
        const requestId=<string>req.params.requestId

        try {
            apiResponse.data =await this._rideRequestService.acceptRequest(userId, requestId)
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
        const {userId} = <Payload>await getPayload(req, res)
        const requestId = <string>req.params.requestId
        try {
            apiResponse.data =await this._rideRequestService.cancelRequest({by:{id:requestId,customer_id:userId} })
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

    async pendingRequests(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        try {
            apiResponse.data =await this._rideRequestService.pendingRequests()
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

    async currentRequest(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const {userId, role} = <Payload>await getPayload(req, res)
        try {
            if(role =="customer"){
                apiResponse.data =await this._rideRequestService.currentRequest({by:{customer_id:userId}})
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

    async myRequests(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const {userId, role} = <Payload>await getPayload(req, res)
        try {
            if(role =="customer"){
                apiResponse.data =await this._rideRequestService.findAllBy({by:{customer_id:userId}})
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


    async deleteMyRequest(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const {userId, role} = <Payload>await getPayload(req, res)
        const  requestId = <string>req.params.requestId
        try {
            if(role =="customer"){
                apiResponse.data =await this._rideRequestService.deleteRequest({by:{customer_id:userId, id:requestId}})
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
    
    async myRequestById(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const {userId, role} = <Payload>await getPayload(req, res)
        const  requestId = <string>req.params.requestId
        try {
            if(role =="customer"){
                apiResponse.data =await this._rideRequestService.findOneBy({by:{customer_id:userId, id:requestId}})
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

    async findAllRequests(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        try {
            apiResponse.data =await this._rideRequestService.findAllBy()
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

    
}