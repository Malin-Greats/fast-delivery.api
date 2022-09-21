import { Express, Router, Request, Response }from "express"
import { isAuthorized } from "../common/middleware/authorization.ware"
import {ERole as role} from '../auth/enums/user-role.enum'
import { psqlDB } from "../data-source"
import { User } from "../auth/domain/user.model"
import { UserRepository } from "../auth/repository/user.repository"
import { RoleRepository } from "../auth/repository/role.repository"
import { Role } from "../auth/domain/role.model"
import { AuthService } from "../auth/services/auth.service"
import { RoleService } from "../auth/services/role.service"
import { AuthHandler } from "../auth/handlers/auth.http"
import { UserService } from "../auth/services/user.service"
import { UserHandler } from "../auth/handlers/user.http"
import { RoleHandler } from "../auth/handlers/role.http"
import { validators as v } from "./route.validators"

export function appRoutes(routes:Express):Router{
    psqlDB.init()

    const userRepository = new UserRepository(psqlDB.DataSrc.getRepository(User))
    const roleRepository = new RoleRepository(psqlDB.DataSrc.getRepository(Role))
   
    const userService = new UserService(userRepository,roleRepository )
    const roleService = new RoleService(roleRepository)
    const authService = new AuthService(userRepository, roleRepository)

    const roleHandler= new RoleHandler(roleService)
    const userHandler= new UserHandler(userService)
    const authHandler= new AuthHandler(authService)


    const authRouter:Router = Router()
    authRouter
    .post("/login",v.auth.loginValidator , (req:Request, res:Response)=> authHandler.loginUser(req, res))
    .post("/sign-up",v.auth.signUpValidator ,(req:Request, res:Response)=> authHandler.signUp(req, res))
    .post("/change-password",(req:Request, res:Response)=>authHandler.changerPassword(req, res))

    const roleRouter = Router()
    roleRouter.use(isAuthorized([role.ADMIN]))
    .post("/",v.role.postValidator , (req:Request, res:Response)=> roleHandler.createRole(req, res))
    .get("/",(req:Request, res:Response)=>roleHandler.findAllRoles(req, res))
    .get("/:roleId",(req:Request, res:Response)=>roleHandler.findRoleById(req, res))
    .put("/:roleName",(req:Request, res:Response)=>roleHandler.findRoleByName(req, res))
    .put("/:roleId",(req:Request, res:Response)=>roleHandler.updateRole(req, res))

    const userRouter:Router = Router()
    userRouter
    .get("/",isAuthorized([role.ADMIN]),(req:Request, res:Response)=>userHandler.getAllUsers(req, res))
    .get("/profile",isAuthorized([role.ADMIN, role.DRIVER, role.CUSTOMER]),(req:Request, res:Response)=>userHandler.userProfile(req, res))
    .get("/:userId",isAuthorized([role.ADMIN]),(req:Request, res:Response)=>userHandler.getUserById(req, res))
    .put("/:userId",isAuthorized([role.ADMIN]),(req:Request, res:Response)=>userHandler.updateUser(req, res))
    .delete("/:userId",isAuthorized([role.ADMIN]),(req:Request, res:Response)=>userHandler.deleteUser(req, res))
    

    routes.use("/users",userRouter)
    routes.use("/auth", authRouter)
    routes.use("/roles", roleRouter)
    return routes
}

