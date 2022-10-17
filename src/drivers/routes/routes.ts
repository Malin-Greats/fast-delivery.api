import {Request, Response, Router} from "express"
import { psqlDB } from "../../data-source"
import { DriverRepository } from "../repository/driver.repository"
import { VehicleRepository } from "../repository/vehicle.repository"
import { DriverDocumentsRepository } from "../repository/driver-docs.repository"
import { DriverService } from "../services/driver.svc"
import { VehicleService } from "../services/vehicle.svc"
import { DriverDocumentsService } from "../services/driver-docs.svc"
import { DriverHandler } from "../handlers/driver.http"
import { VehicleHandler } from "../handlers/vehicle.http"
import { DriverDocumentsHandler } from "../handlers/documents.http"
import { ERole as role, Role } from "../../auth/domain/role.model"
import { driverRouteValidator as v} from "./routes.validator"
import { isDriverExists } from "../utilts/is-driver-exists.middleware"
import { isAuthorized } from "../../shared/middleware/isAuthorized"
import { DriverProfileHandler } from "../handlers/driver-profile.http"
import { DriverAuthHandler } from "../handlers/driver-auth.http"
import { IRoleRepository } from "../../auth/ports/role-repository.port"
import { DriverAuthSvc } from "../services/driver-auth.svc"
import { Driver } from "../domain/driver.model"
import { DriverProfileSvc } from "../services/driver-profile.svc"
import { Vehicle } from "../domain/vehicles.model"
import { DriverDocuments } from "../domain/driver-docs.model"
import { ShareRouteValidator as vShared } from "../../shared/validators/route-validators"

export class DriverRoutes{

    private driverRepo;
    private driverSvc;
    private driverAuthSvc;
    private driverHandler;
    private driverAuthHandler;
    private driverProfileSvc
    private driverProfileHandler;
    private vehicleRepo;
    private vehicleSvc;
    private documentdsRepo;
    private documentsSvc;
    private vehicleHandler;
    private documentsHandler

    constructor(private _roleRepo:IRoleRepository){
        this.driverRepo = new DriverRepository(psqlDB.DataSrc.getRepository(Driver))
        this.vehicleRepo = new VehicleRepository(psqlDB.DataSrc.getRepository(Vehicle))
        this.documentdsRepo = new DriverDocumentsRepository(psqlDB.DataSrc.getRepository(DriverDocuments))
            
        this.driverSvc = new DriverService( this.driverRepo,  this._roleRepo)
        this.driverAuthSvc = new DriverAuthSvc(this.driverRepo, this._roleRepo)
        this.driverProfileSvc = new DriverProfileSvc( this.driverRepo)
        this.vehicleSvc = new VehicleService(this.vehicleRepo)
        this.documentsSvc = new DriverDocumentsService(this.documentdsRepo)

        this.vehicleHandler = new VehicleHandler(this.vehicleSvc)
        this.driverHandler = new DriverHandler( this.driverSvc)
        this.driverAuthHandler =  new DriverAuthHandler( this.driverAuthSvc)
        this.documentsHandler = new DriverDocumentsHandler(this.documentsSvc)
        this.driverProfileHandler = new DriverProfileHandler(this.driverProfileSvc,this.vehicleSvc,this.documentsSvc)
    }

     driver():Router{
        const driverRouter:Router = Router()
        driverRouter.use(isAuthorized([role.DRIVER]))
         .get("/profile", async(req:Request,res:Response)=>{this.driverProfileHandler.getProfile(req, res)})
         .put("/profile-edit", async(req:Request,res:Response)=>{this.driverProfileHandler.editProfile(req, res)})
         .put("/change-password", vShared.profile.change_password, async(req:Request,res:Response)=>{this.driverProfileHandler.changePassword(req, res)})
         .put("/change-profile-photo", async(req:Request,res:Response)=>{this.driverProfileHandler.addProfilePhoto(req, res)})

         .post("/documents",async(req:Request,res:Response)=>{this.documentsHandler.addDocuments(req, res)})
         .get("/documents", async(req:Request,res:Response)=>{this.driverProfileHandler.myDocuments(req, res)})
         .put("/documents", async(req:Request,res:Response)=>{this.driverProfileHandler.updateDocuments(req, res)})
         .delete("/documents", async(req:Request,res:Response)=>{this.driverProfileHandler.deleteDocuments(req, res)})

         .get("/vehicles", async(req:Request,res:Response)=>{this.driverProfileHandler.myVehicles(req, res)})
         .post("/vehicles",v.vehicle.create, async(req:Request,res:Response)=>{this.driverProfileHandler.addVehicles(req, res)})
         .get("/vehicles/:vehicleId", async(req:Request,res:Response)=>{this.driverProfileHandler.findVehicleById(req, res)})
         .put("/vehicles/:vehicleId",  async(req:Request,res:Response)=>{this.driverProfileHandler.updateVehicles(req, res)}) 
         .delete("/vehicles/:vehicleId",  async(req:Request,res:Response)=>{this.driverProfileHandler.deleteVehicles(req, res)})

         return Router().use("/",driverRouter)
    }

     admin():Router{
        const driverRouter:Router = Router()
        driverRouter.use(isAuthorized([role.ADMIN]))
        .post("/", async(req:Request,res:Response)=>{this.driverHandler.signUp(req, res)})
        .get("/", async(req:Request,res:Response)=>{this.driverHandler.findAllDrivers(req, res)})
        .get("/:driverId", async(req:Request,res:Response)=>{this.driverHandler.findDriverById(req, res)})
        .put("/:driverId", async(req:Request,res:Response)=>{this.driverHandler.updateDriver(req, res)})
        .delete("/:driverId", async(req:Request,res:Response)=>{this.driverHandler.deleteDriver(req, res)})
        .put("/:driverId/approve", async(req:Request,res:Response)=>{this.driverHandler.approveDriver(req, res)})
        .put("/:driverId/reject",  async(req:Request,res:Response)=>{this.driverHandler.rejectDriver(req, res)})
        .get("/:driverId/approval-status",  async(req:Request,res:Response)=>{this.driverHandler.getApprovalStatus(req, res)})

        driverRouter
        .post("/:driverId/vehicles", v.vehicle.create,async(req:Request,res:Response)=>{this.vehicleHandler.addVehicle(req, res)})
        .get("/:driverId/vehicles",async(req:Request,res:Response)=>{this.vehicleHandler.findDriverVehicles(req, res)})
        .get("/:driverId/vehicles/:vehicleId",async(req:Request,res:Response)=>{this.vehicleHandler.findVehicleById(req, res)})
        .put("/:driverId/vehicles/:vehicleId",async(req:Request,res:Response)=>{this.vehicleHandler.updateVehicle(req, res)})
        .delete("/:driverId/vehicles/:vehicleId",async(req:Request,res:Response)=>{this.vehicleHandler.deleteVehicle(req, res)})

        driverRouter
        .post("/:driverId/documents",v.documents.create,async(req:Request,res:Response)=>{this.documentsHandler.addDocuments(req, res)})
        .get("/:driverId/documents",async(req:Request,res:Response)=>{this.documentsHandler.findDocuments(req, res)})
        .put("/:driverId/documents",async(req:Request,res:Response)=>{this.documentsHandler.updateDocuments(req, res)})
        .delete("/:driverId/documents",async(req:Request,res:Response)=>{this.documentsHandler.deleteDocuments(req, res)})
        return Router().use("/drivers", driverRouter)
   }
    auth():Router{
        const router:Router = Router()
        router
        .post("/login", v.driver.login,async(req:Request,res:Response)=>{this.driverAuthHandler.login(req, res)})
        .post("/sign-up", v.driver.signUp,async(req:Request,res:Response)=>{this.driverAuthHandler.signUp(req, res)})
        return Router().use("/driver", router)
    }
}


