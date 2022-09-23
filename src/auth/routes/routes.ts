import {Request, Response, Router} from "express"
import { psqlDB } from "../../data-source"
import { Role } from "../domain/role.model"
import { User } from "../domain/user.model"
import { AuthHandler } from "../handlers/auth.http"
import { ProfileHandler } from "../handlers/profile.http"
import { RoleHandler } from "../handlers/role.http"
import { UserHandler } from "../handlers/user.http"
import { RoleRepository } from "../repository/role.repository"
import { UserRepository } from "../repository/user.repository"
import { AuthService } from "../services/auth.service"
import { ProfileService } from "../services/profile.service"
import { RoleService } from "../services/role.service"
import { UserService } from "../services/user.service"
import { routeValidate } from "./route-validators"
import { ERole as role } from "../domain/role.model"
import { isAuthorized } from "../../shared/middleware/isAuthorized"

export function authRoutes():Router{
    const roleRepository = new RoleRepository(psqlDB.DataSrc.getRepository(Role))
    const userRepository = new UserRepository(psqlDB.DataSrc.getRepository(User), )

    const roleService = new RoleService(roleRepository)
    const profileService = new ProfileService(userRepository)
    const authService = new AuthService(userRepository, roleRepository)
    const userService = new UserService(userRepository, roleRepository)

    const roleHandler = new RoleHandler(roleService)
    const userHandler = new UserHandler(userService)
    const authHandler = new AuthHandler(authService)
    const profileHandler = new ProfileHandler(profileService)

    const roleRouter= Router()
    roleRouter.use(isAuthorized([role.ADMIN]))
    .post("/", routeValidate.role.create,async(req:Request,res:Response)=>{roleHandler.createRole(req, res)})
    .get("/", async(req:Request,res:Response)=>{roleHandler.findAllRoles(req, res)})
    .get("/:roleId", async(req:Request,res:Response)=>{roleHandler.findRoleById(req, res)})
    .get("/:roleName", async(req:Request,res:Response)=>{roleHandler.findRoleByName(req, res)})
    .put("/:roleId", async(req:Request,res:Response)=>{roleHandler.updateRole(req, res)})
    
    const authRouter= Router()
    authRouter
    .post("/sign-up",routeValidate.auth.signUp, async(req:Request,res:Response)=>{authHandler.signUp(req, res)})
    .post("/login",routeValidate.auth.login, async(req:Request,res:Response)=>{authHandler.login(req, res)})
    .post("/logout", async(req:Request,res:Response)=>{authHandler.loggingOut(req, res)})

    const profileRouter= Router()
    profileRouter.use(isAuthorized([role.DRIVER, role.CUSTOMER]))
    .get("/", async(req:Request,res:Response)=>{profileHandler.getProfile(req, res)})
    .put("/edit", async(req:Request,res:Response)=>{profileHandler.editProfile(req, res)})

    const userRouter= Router()
    userRouter.use(isAuthorized([role.ADMIN]))
    .get("/", async(req:Request,res:Response)=>{userHandler.getAllUsers(req, res)})
    .get("/:userId", async(req:Request,res:Response)=>{userHandler.getUserById(req, res)})
    .get("/:email", async(req:Request,res:Response)=>{userHandler.getUserByEmail(req, res)})
    .get("/:contact", async(req:Request,res:Response)=>{userHandler.getUserByContact(req, res)})
    
    const routes = Router()
    routes.use("/auth", authRouter)
    routes.use("/users", userRouter)
    routes.use("/roles", roleRouter)
    routes.use("/profile", profileRouter)
    return routes
}
