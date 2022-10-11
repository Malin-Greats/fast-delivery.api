import {Request, Response, Router} from "express"
import { ERole as role } from "../../auth/domain/role.model"
import { isAuthorized } from "../../shared/middleware/isAuthorized"
import { CustomerHandler } from "../handlers/customer.http"
import { CustomerProfileHandler } from "../handlers/customer-profile.http"
import { CustomerAuthHandler } from "../handlers/customer-auth.http"
import { psqlDB } from "../../data-source"
import { Customer } from "../domain/customer.model"
import { CustomerRepo } from "../repository/customer.repository"
import { CustomerAuthSvc } from "../services/customer-auth.svc"
import { CustomerProfileSvc } from "../services/customer-profile.svc"
import { CustomerSvc } from "../services/customers.svc"
import { IRoleRepository } from "../../auth/ports/role-repository.port"
import { CustomerRouteValidators as v } from "./route-validators"
import { ShareRouteValidator as sharedV } from "../../shared/validators/route-validators"
export class CustomerRoutes{
    private customerRepo;
    private customerSvc;
    private customerProfileSvc;
    private customerAuthSvc;
    private customerHandler;
    private customerAuthHandler
    private customerProfileHandler;
    constructor(private _roleRepository:IRoleRepository){
         this.customerRepo = new CustomerRepo(psqlDB.DataSrc.getRepository(Customer))
         this.customerSvc = new CustomerSvc(this.customerRepo, this._roleRepository)
         this.customerProfileSvc = new CustomerProfileSvc(this.customerRepo)
         this. customerAuthSvc= new CustomerAuthSvc(this.customerRepo,this._roleRepository)
         this.customerHandler = new CustomerHandler(this.customerSvc)
         this.customerProfileHandler = new CustomerProfileHandler(this.customerProfileSvc)
         this.customerAuthHandler = new CustomerAuthHandler(this.customerAuthSvc)
    }

    customer(){
        const profileRouter= Router()
        profileRouter.use(isAuthorized([role.CUSTOMER]))
        .get("/profile",
            async(req:Request,res:Response)=>{this.customerProfileHandler.getProfile(req, res)})
        .put("/profile-edit",sharedV.profile.edit,
            async(req:Request,res:Response)=>{this.customerProfileHandler.editProfile(req, res)})
        .put("/change-password",v.profile.change_password,
            async(req:Request,res:Response)=>{this.customerProfileHandler.changePassword(req, res)})
        .put("/change-profile-photo",
            async(req:Request,res:Response)=>{this.customerProfileHandler.addProfilePhoto(req, res)})
        return profileRouter
    }
    admin(){
        const customerRouter= Router()
        customerRouter.use(isAuthorized([role.ADMIN]))
        .post("/", async(req:Request,res:Response)=>{this.customerHandler.createCustomer(req, res)})
        .get("/", async(req:Request,res:Response)=>{this.customerHandler.findAllCustomers(req, res)})
        .get("/:customerId", async(req:Request,res:Response)=>{this.customerHandler.findCustomerById(req, res)})
        .put("/:customerId",  async(req:Request,res:Response)=>{this.customerHandler.updateCustomer(req, res)})
        .delete("/:customerId",  async(req:Request,res:Response)=>{this.customerHandler.deleteCustomer(req, res)})
        return Router().use("/customers", customerRouter)
    }
    auth(){
        const authRouter= Router()
        authRouter
        .post("/login", async(req:Request,res:Response)=>{this.customerAuthHandler.login(req, res)})
        .post("/sign-up", async(req:Request,res:Response)=>{this.customerAuthHandler.signUp(req, res)})
        return Router().use("/customer", authRouter)
    }
}