export class AppError {
    public readonly message: string;
    public readonly statusCode: number;
  
    constructor(message: string, statusCode = 400) {
      this.message = message;
      this.statusCode = statusCode;
    }
  }

export const isError=(toBeDetermined:any|AppError):toBeDetermined is AppError=>{
  return !!(toBeDetermined as AppError)?.message
}
export enum ErrorMessages{
  DBError="Error occured while dealing with the database."
}
  export default AppError;
