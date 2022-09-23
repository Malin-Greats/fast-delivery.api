import { Request, Response, NextFunction } from "express";
import { psqlDB } from "../../data-source";
import { Driver } from "../domain/driver.model";
import { DriverRepository } from "../repository/driver.repository";

export const isDriverExists=async (req:Request,res:Response,next:NextFunction)=>{
    const driverId =<string>req.params.driverId
     if(!driverId){
         return res.sendStatus(400)
     }

    const driverRepository = new DriverRepository(psqlDB.DataSrc.getRepository(Driver))
    let  result!:Driver
    try {
         result =await driverRepository.findById(driverId)
    } catch (error) {
        return res.status(401).json(error)
    }
     next()
 }