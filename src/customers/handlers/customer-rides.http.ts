import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error"
import { ApiResponse } from "../../shared/dto/response"
import { ICustomerRideSvc } from "../ports/customer-ride-svc.port"
import { jwt, Payload } from "../../shared/jwt.util"
import { getPayload } from "../../shared/http/get-payload"
export class CustomerRidesHandler{

    constructor(private _rideSvc:ICustomerRideSvc){}

    async customerRides(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const payload = <Payload>await getPayload(req, res)
        try {
            apiResponse.data= await this._rideSvc.myRide(payload.userId)
            apiResponse.success=true
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