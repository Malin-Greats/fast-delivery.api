import {Request, Response, Router} from "express"
import { IRoleRepository } from "../../auth/ports/role-repository.port"
import { psqlDB } from "../../data-source";
import { Admin } from "../domain/admin.model";
import { AdminAuthHandler } from "../handlers/admin-auth.http"
import { AdminRepository } from "../repository/admin.-repo";
import { AdminAuthSvc } from "../services/admin-auth.service";
import { AdminRoutesValidator as v } from "./route-validators"

export class AdminRoutes{
    private adminRepository;
    private adminAuthSvc;
    private adminAuthHandler;

    constructor(private roleRepository:IRoleRepository){
        this.adminRepository = new AdminRepository(psqlDB.DataSrc.getRepository(Admin))
        this.adminAuthSvc = new AdminAuthSvc(this.adminRepository, this.roleRepository)
        this.adminAuthHandler = new AdminAuthHandler(this.adminAuthSvc)
    }
    auth(){
        const authRouter= Router()
        authRouter
        .post("/login", v.auth.login, async(req:Request,res:Response)=>{this.adminAuthHandler.login(req, res)})
        .post("/sign-up", v.auth.signUp,async(req:Request,res:Response)=>{this.adminAuthHandler.signUp(req, res)})
        return Router().use("/admin", authRouter)
    }
}