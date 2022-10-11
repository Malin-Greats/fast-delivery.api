import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error"
import { ApiResponse } from "../../shared/dto/response"
import { ICustomerSvc } from "../ports/customer-svc.port"
import { CustomerIn } from "../domain/dto/customer.dto"
import { IPhoneNumber } from "../../shared/types/phone.type"

export class CustomerHandler{

    constructor(private _customerSvc:ICustomerSvc){}

    async createCustomer(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        let customerIn=<CustomerIn>req.body
        try {
            apiResponse.data= await this._customerSvc.create(customerIn)
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

    async findCustomerById(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        let customerId=<string>req.params.customerId
        try {
            apiResponse.data= await  this._customerSvc.findById(customerId)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(apiResponse)
    }

    async findAllCustomers(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        try {
            apiResponse.data=await this._customerSvc.findAll(null)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(apiResponse)
    }
    async updateCustomer(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        let customerId=<string>req.params.customerId
        let requestIn=<CustomerIn>req.body
        try {
            apiResponse.data=  await this._customerSvc.update(customerId,requestIn)
            apiResponse.success = true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
        return res.status(201).json(apiResponse)
    }

    async deleteCustomer(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let customerId=<string>req.params.customerId
        try {
            apiResponse.data=await this._customerSvc.delete(customerId)
       } catch (error) {
          if (isError(error)){
            apiResponse.errors= new AppError(error.message,error.detail, 400)
               return res.status(apiResponse.errors.statusCode).json(apiResponse)
           }
           return res.status(500).json(error)
       }
         return res.status(204).json(apiResponse)
    }

    async findByPhoneNumber(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let phoneNumber=<string>req.query.phoneNumber
        const phone_number = <IPhoneNumber>{phone_number:phoneNumber}
        try {
            apiResponse.data=await this._customerSvc.findByPhone(phone_number)
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