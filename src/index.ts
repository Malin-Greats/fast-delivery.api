import helmet from "helmet";
import express, { Request, Response } from "express";
import morgan from 'morgan'
import dotenv from 'dotenv';
import logger from "./shared/errors/logger";
import "reflect-metadata";
import { psqlDB } from "./data-source";
import { RoleRepository } from "./auth/repository/role.repository";
import { Role } from "./auth/domain/role.model";
import { authRoutes } from "./auth/routes/routes";
import { driverRoutes } from "./drivers/routes/routes";
import { rideRoutes } from "./ride/routes/routes";

dotenv.config();

psqlDB.init()
const repo=new RoleRepository(psqlDB.DataSrc.getRepository(Role))
const app = express()
app.use(helmet());
app.use(express.json())
app.use(morgan('dev'))
app.get("",(req:Request, res:Response)=>{
    return res.status(200).send("Welcome to Fast Delivery RESTful API.!")
} )
app.use(authRoutes())
app.use(driverRoutes())
app.use(rideRoutes())

app.listen(process.env.PORT||3000, ()=>{
    logger.info(`Application listening on http://172.20.10.2:${process.env.PORT||3000}`)
})
