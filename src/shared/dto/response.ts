import AppError from "../errors/error";

export class ApiResponse{
    success:boolean=false ;
    message!:string;
    data:any
    errors!:AppError
}