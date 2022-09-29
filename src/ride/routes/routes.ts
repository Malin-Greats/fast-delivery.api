import {Request, Response, Router} from "express"
import { ERole as role  } from "../../auth/domain/role.model"
import { psqlDB } from "../../data-source"
import { isAuthorized } from "../../shared/middleware/isAuthorized"
import { CancelledRide } from "../domain/cancelled-ride-request.model"
import { RideRequest } from "../domain/ride-request.model"
import { RideType } from "../domain/ride-type.model"
import { Ride } from "../domain/ride.model"
import { RideRequestHandler } from "../handlers/ride-request.http"
import { RideTypeHandler } from "../handlers/ride-type.http"
import { RidesHandler } from "../handlers/rides.http"
import { CancelledRideRepository } from "../repository/cancelled-ride.repository"
import { RideRequestRepository } from "../repository/ride-request.repository"
import { RideTypeRepository } from "../repository/ride-type.repository"
import { RideRepository } from "../repository/ride.repository"
import { CancelledRideService } from "../services/cancelled-ride-requests.service"
import { RideRequestService } from "../services/ride-request.service"
import { RideTypeService } from "../services/ride-type.service"
import { RideService } from "../services/ride.service"
import { ridesRouteValidator as v } from "./routes.validator"


export function rideRoutes():Router{
    const rideRepository = new RideRepository(psqlDB.DataSrc.getRepository(Ride))
    const rideTypeRepository = new RideTypeRepository(psqlDB.DataSrc.getRepository(RideType))
    const rideRequestRepoisitory = new RideRequestRepository(psqlDB.DataSrc.getRepository(RideRequest))
    const cancelledRideRepository = new CancelledRideRepository(psqlDB.DataSrc.getRepository(CancelledRide))

    const rideTypeService = new RideTypeService(rideTypeRepository)
    const cancelledRideService = new CancelledRideService(cancelledRideRepository)
    const rideRequestService = new RideRequestService(rideRequestRepoisitory, rideRepository)
    const rideService = new RideService(rideRepository, rideRequestRepoisitory, cancelledRideService)

    const rideHandler = new RidesHandler(rideService)
    const rideTypeHandler = new RideTypeHandler(rideTypeService)
    const rideRequestHandler = new RideRequestHandler(rideRequestService)

    const rideTypesRouter= Router()
    const ridesRouter=Router()
    const ridesRequestsRouter= Router()

    ridesRouter
    .get("/",async(req:Request,res:Response)=>{rideHandler.findAllRides(req, res)})
    .get("/:rideId", async(req:Request,res:Response)=>{rideHandler.findRideById(req, res)})
    .put("/cancel",async(req:Request,res:Response)=>{rideHandler.cancelRide(req, res)})
    .put("/start", async(req:Request,res:Response)=>{rideHandler.startRide(req, res)})
    .put("/stop", async(req:Request,res:Response)=>{rideHandler.stopRide(req, res)})
    .post("/:rideId/pay",async(req:Request,res:Response)=>{rideHandler.payForRide(req, res)})

    ridesRequestsRouter
    .put("/accept", v.rideRequest.accept,async(req:Request,res:Response)=>{rideRequestHandler.acceptRequest(req, res)})
    .get("/all-pending", async(req:Request,res:Response)=>{rideRequestHandler.broadcastPendingRequest(req, res)})
    .put("/cancel",async(req:Request,res:Response)=>{rideRequestHandler.cancelRequest(req, res)})
    .get("/current", async(req:Request,res:Response)=>{rideRequestHandler.customerCurrentRequest(req, res)})
    .post("/send", v.rideRequest.send,  async(req:Request,res:Response)=>{rideRequestHandler.sendRideRequest(req, res)})

     rideTypesRouter.use(isAuthorized([role.ADMIN]))
    .post("/", v.rideTypes.create, async(req:Request,res:Response)=>{rideTypeHandler.addRideType(req, res)})
    .get("/",  async(req:Request,res:Response)=>{rideTypeHandler.findAllDrivers(req, res)})
    .get("/:rideTypeId",async(req:Request,res:Response)=>{rideTypeHandler.findRideTypeById(req, res)})
    .put("/:rideTypeId", v.rideTypes.put, async(req:Request,res:Response)=>{rideTypeHandler.updateRideType(req, res)})
    .delete("/:rideTypeId",async(req:Request,res:Response)=>{rideTypeHandler.deleteRideTypeIn(req, res)})
   
    const routes=Router()
    routes.use("/rides",ridesRouter)
    routes.use("/ride-requests",ridesRequestsRouter)
    routes.use("/ride-types",rideTypesRouter)


    return routes
}


