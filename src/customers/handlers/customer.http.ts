import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error"
import { ApiResponse } from "../../shared/dto/response"
import { ICustomerSvc } from "../ports/customer-svc.port"
import { CustomerIn } from "../domain/dto/customer.dto"
import { IPhoneNumber } from "../../shared/types/phone.type"
import { ERole as role } from "../../auth/domain/role.model"
import { EnforceHttpUrl, profileUrl } from "../../shared/multer/image-uploads"

export class CustomerHandler{

    constructor(private _customerSvc:ICustomerSvc){}

    async createCustomer(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        let {firstname, lastname, email, password, phone_number,}=<CustomerIn>req.body
        const customerIn:CustomerIn = {
            firstname, lastname, email, password, phone_number,
            role:role.CUSTOMER
        }
        try {
            apiResponse.data= await this._customerSvc.create(customerIn)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail)
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
            const data= await  this._customerSvc.findById(customerId)
            apiResponse.data = data
            apiResponse.data.profile_photo =  EnforceHttpUrl(req, data.profile_photo, profileUrl)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(apiResponse)
    }

    async findAllCustomers(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        try {
            const data=await this._customerSvc.findAll(null)
            for (let cust of data){
                const profile = EnforceHttpUrl(req, cust.profile_photo, profileUrl)
                cust.profile_photo = profile
            }
            apiResponse.data =  data
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail)
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
            const data=  await this._customerSvc.update(customerId,requestIn)
            apiResponse.data = data
            apiResponse.data.profile_photo =  EnforceHttpUrl(req, data.profile_photo, profileUrl)
            apiResponse.success = true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail)
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
            const data=await this._customerSvc.delete(customerId)
            apiResponse.data = data
            apiResponse.data.profile_photo =  EnforceHttpUrl(req, data.profile_photo, profileUrl)
       } catch (error) {
          if (isError(error)){
            apiResponse.errors= new AppError(error.message,error.detail)
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
            apiResponse.errors= new AppError(error.message,error.detail)
               return res.status(apiResponse.errors.statusCode).json(apiResponse)
           }
           return res.status(500).json(error)
       }
         return res.status(200).json(apiResponse)
    }
}