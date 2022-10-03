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



export class RideRoutes{
    private rideTypeRepository;
    private rideRepository;
    private cancelledRideRepository;
    private rideRequestRepoisitory;
    private rideTypeService;
    private cancelledRideService
    private rideRequestService;
    private rideService;
    private rideHandler;
    private rideRequestHandler;
    private rideTypeHandler;
    
    constructor(){
        this.rideRepository = new RideRepository(psqlDB.DataSrc.getRepository(Ride))
        this.rideTypeRepository = new RideTypeRepository(psqlDB.DataSrc.getRepository(RideType))
        this.rideRequestRepoisitory = new RideRequestRepository(psqlDB.DataSrc.getRepository(RideRequest))
        this.cancelledRideRepository = new CancelledRideRepository(psqlDB.DataSrc.getRepository(CancelledRide))

        this.rideTypeService = new RideTypeService(this.rideTypeRepository)
        this.cancelledRideService = new CancelledRideService(this.cancelledRideRepository)
        this.rideRequestService = new RideRequestService(this.rideRequestRepoisitory, this.rideRepository, this.rideTypeRepository)
        this.rideService = new RideService(this.rideRepository, this.rideRequestRepoisitory, this.cancelledRideService)

        this.rideHandler = new RidesHandler(this.rideService)
        this.rideTypeHandler = new RideTypeHandler(this.rideTypeService)
        this.rideRequestHandler = new RideRequestHandler(this.rideRequestService)
    }
    rides(){
        const router = Router()
        const rides=Router()
        rides.use(isAuthorized([role.DRIVER, role.CUSTOMER]))
        .put("/start", async(req:Request,res:Response)=>{this.rideHandler.startRide(req, res)})
        .put("/stop", async(req:Request,res:Response)=>{this.rideHandler.stopRide(req, res)})
        .get("/my-rides",async(req:Request,res:Response)=>{this.rideHandler.myRides(req, res)})
        .post("/cancel",async(req:Request,res:Response)=>{this.rideHandler.cancelRide(req, res)})
        .get("/current", async(req:Request,res:Response)=>{this.rideHandler.currentRide(req, res)})
        .post("/:rideId/pay",async(req:Request,res:Response)=>{this.rideHandler.payForRide(req, res)})
        .get("/:rideId", async(req:Request,res:Response)=>{this.rideHandler.findRideById(req, res)})

        const rideRequests= Router()
        rideRequests.use(isAuthorized([role.CUSTOMER, role.DRIVER]))
        .get("/",async(req:Request,res:Response)=>{this.rideRequestHandler.myRequests(req, res)})
        .get("/all-pending", async(req:Request,res:Response)=>{this.rideRequestHandler.pendingRequests(req, res)}) //DRIVER ONLY
        .get("/current",async(req:Request,res:Response)=>{this.rideRequestHandler.currentRequest(req, res)})
        .post("/send", v.rideRequest.send,  async(req:Request,res:Response)=>{this.rideRequestHandler.sendRequest(req, res)})
        .get("/:requestId",async(req:Request,res:Response)=>{this.rideRequestHandler.myRequestById(req, res)})
        .delete("/:requestId",async(req:Request,res:Response)=>{this.rideRequestHandler.deleteMyRequest(req, res)})
        .put("/:requestId/cancel",async(req:Request,res:Response)=>{this.rideRequestHandler.cancelRequest(req, res)})
        .put("/:requestId/accept",async(req:Request,res:Response)=>{this.rideRequestHandler.acceptRequest(req, res)})//DRIVER ONLY


        router.use("/rides", rides)
        router.use("/ride-requests",rideRequests,)
        return router
    }

    admin(){
        const router = Router()
        const ridesRouter=Router()
        ridesRouter
        .get("/",async(req:Request,res:Response)=>{this.rideHandler.findAllRides(req, res)})
        .get("/:rideId", async(req:Request,res:Response)=>{this.rideHandler.findRideById(req, res)})

        const ridesRequestsRouter= Router()
        ridesRequestsRouter
        .get("/",async(req:Request,res:Response)=>{this.rideRequestHandler.findAllRequests(req, res)})
        .get("/pending", async(req:Request,res:Response)=>{this.rideRequestHandler.pendingRequests(req, res)})

        const rideTypesRouter= Router()
         rideTypesRouter.use(isAuthorized([role.ADMIN]))
        .post("/", v.rideTypes.create, async(req:Request,res:Response)=>{this.rideTypeHandler.addRideType(req, res)})
        .get("/",  async(req:Request,res:Response)=>{this.rideTypeHandler.findAllDrivers(req, res)})
        .get("/:rideTypeId",async(req:Request,res:Response)=>{this.rideTypeHandler.findRideTypeById(req, res)})
        .put("/:rideTypeId", v.rideTypes.put, async(req:Request,res:Response)=>{this.rideTypeHandler.updateRideType(req, res)})
        .delete("/:rideTypeId",async(req:Request,res:Response)=>{this.rideTypeHandler.deleteRideTypeIn(req, res)})

        router.use("/rides", ridesRouter)
        router.use("/ride-requests", ridesRequestsRouter)
        router.use("/ride-types", rideTypesRouter)
        return router
    }
}