import {Request, Response, Router} from "express"
import { psqlDB } from "../../data-source"
import { DriverRepository } from "../repository/driver.repository"
import { VehicleRepository } from "../repository/vehicle.repository"
import { DriverDocumentsRepository } from "../repository/driver-docs.repository"
import { DriverService } from "../services/driver.service"
import { VehicleService } from "../services/vehicle.service"
import { DriverDocumentsService } from "../services/driver-docs.service"
import { DriverHandler } from "../handlers/driver.http"
import { VehicleHandler } from "../handlers/vehicle.http"
import { DriverDocumentsHandler } from "../handlers/documents.http"
import { ERole as role, Role } from "../../auth/domain/role.model"
import { User } from "../../auth/domain/user.model"
import { UserRepository } from "../../auth/repository/user.repository"
import { Driver } from "../domain/driver.model"
import { Vehicle } from "../domain/vehicles.model"
import { DriverDocuments } from "../domain/driver-docs.model"
import { RoleRepository } from "../../auth/repository/role.repository"
import { driverRouteValidator as v} from "./routes.validator"
import { isDriverExists } from "../utilts/is-driver-exists.middleware"
import { isAuthorized } from "../../shared/middleware/isAuthorized"

export function driverRoutes():Router{
    const roleRepository = new RoleRepository(psqlDB.DataSrc.getRepository(Role))
    const userRepository = new UserRepository(psqlDB.DataSrc.getRepository(User))
    const driverRepository = new DriverRepository(psqlDB.DataSrc.getRepository(Driver))
    const vehicleRepository = new VehicleRepository(psqlDB.DataSrc.getRepository(Vehicle))
    const driverDocsRepository = new DriverDocumentsRepository(psqlDB.DataSrc.getRepository(DriverDocuments))

    const driverService = new DriverService(driverRepository, userRepository, roleRepository)
    const vehicleService = new VehicleService(vehicleRepository)
    const driverDocsService = new DriverDocumentsService(driverDocsRepository)

    const driverHandler = new DriverHandler(driverService)
    const vehicleHandler = new VehicleHandler(vehicleService)
    const driverDocsHandler = new DriverDocumentsHandler(driverDocsService)

    const driverRouter= Router()
    const signUpRouter=Router()

    signUpRouter
    .post("/driver", v.driver.signUp,async(req:Request,res:Response)=>{driverHandler.signUp(req, res)})

    driverRouter.use(isAuthorized([role.ADMIN, role.DRIVER]))
    .post("/", v.driver.signUp,async(req:Request,res:Response)=>{driverHandler.signUp(req, res)})
    .get("/", async(req:Request,res:Response)=>{driverHandler.findAllDrivers(req, res)})
    .get("/:driverId", async(req:Request,res:Response)=>{driverHandler.findDriverById(req, res)})

    driverRouter.use(isAuthorized([role.ADMIN, role.DRIVER]))
    .post("/:driverId/vehicles", v.vehicle.create, isDriverExists,
        async(req:Request,res:Response)=>{vehicleHandler.addDriverVehicle(req, res)})
    .get("/:driverId/vehicles", isDriverExists,
        async(req:Request,res:Response)=>{vehicleHandler.findDriverVehicles(req, res)})

    driverRouter.use(isAuthorized([role.ADMIN, role.DRIVER]))
    .post("/:driverId/documents",v.documents.create,isDriverExists,
         async(req:Request,res:Response)=>{driverDocsHandler.addDriverDocuments(req, res)})
    .get("/:driverId/documents", isDriverExists,
        async(req:Request,res:Response)=>{driverDocsHandler.findDriverDocuments(req, res)})

    const routes=Router()
    routes.use("/drivers",driverRouter)
    routes.use("/sign-up",signUpRouter)

    return routes
}


