import {Request, Response, Router} from "express"
import { isAuthorized } from "../../shared/middleware/isAuthorized"
import { ERole  as role} from "../domain/role.model"
import { RoleHandler } from "../handlers/role.http"
import { routeValidate  as v} from "./route-validators"

export class AuthRoutes{
    constructor (private _roleHandler:RoleHandler){}

    admin(){
        const roleRouter= Router()
        roleRouter.use(isAuthorized([role.ADMIN]))
        .post("/", v.role.create,async(req:Request,res:Response)=>{this._roleHandler.createRole(req, res)})
        .get("/", async(req:Request,res:Response)=>{this._roleHandler.findAllRoles(req, res)})
        .get("/:roleId", async(req:Request,res:Response)=>{this._roleHandler.findRoleById(req, res)})
        .put("/:roleId", async(req:Request,res:Response)=>{this._roleHandler.updateRole(req, res)})
        .delete("/:roleId", async(req:Request,res:Response)=>{this._roleHandler.deleteRole(req, res)})

        const routes = Router()
        routes.use("/roles", roleRouter)
        return routes
    }
}