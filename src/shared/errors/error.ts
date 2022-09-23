
export class AppError {
    public readonly message: string;
    public readonly detail?:string
    public readonly statusCode: number;
  
    constructor(message: string,detail?:string, statusCode = 400) {
      this.message = message;
      this.detail=detail
      this.statusCode = statusCode;
    }
  }

export const isError=(toBeDetermined:any|AppError):toBeDetermined is AppError=>{
  return !!(toBeDetermined as AppError)?.message
}




  export default AppError;