import {Request, Response, Router} from "express"
import { AdminRoutes } from "../admin/routes/admin.routes"
import { Role } from "../auth/domain/role.model"
import { RoleHandler } from "../auth/handlers/role.http"
import { RoleRepository } from "../auth/repository/role.repository"
import { AuthRoutes } from "../auth/routes/routes"
import { RoleService } from "../auth/services/role.service"
import { CustomerRoutes } from "../customers/routes/routes"
import { psqlDB } from "../data-source"
import { DriverRoutes } from "../drivers/routes/routes"
import { RideRoutes } from "../ride/routes/routes"
import { imagesRouter as images } from "../shared/multer/image-uploads"
export function AppRoutes(){
    const appRouter = Router()

    const roleRepository = new RoleRepository(psqlDB.DataSrc.getRepository(Role))
    const roleService = new RoleService(roleRepository)
    const roleHandler = new RoleHandler(roleService)

    const rides =new RideRoutes()
    const auth = new AuthRoutes(roleHandler)
    const admin = new  AdminRoutes(roleRepository)
    const drivers = new DriverRoutes(roleRepository)
    const customers =new CustomerRoutes(roleRepository)

    const indexRouter=Router()
    const authRouter = Router()
    const ridesRouter=Router()
    const adminRouter = Router()
    const imagesRouter = Router()
    const driverRouter = Router()
    const customersRouter=Router()

    authRouter.use(
        "/auth",admin.auth(),customers.auth(),drivers.auth()
    )

    customersRouter.use(
        "/customer",
        customers.customer(),
        customers.auth()
        )

    driverRouter.use(
        "/driver",
        drivers.driver()
    )
    adminRouter.use(
        "/admin",
        auth.admin(),
        rides.admin(), 
        drivers.admin(),
        customers.admin(),
        )

    ridesRouter.use(
        "/",
        rides.rides()
        )
    imagesRouter.use(
        "/images",
        images()
    )

    indexRouter.get("",(req:Request, res:Response)=>{
        return res.status(200).send("Welcome to Fast Delivery RESTful API.!")
    } )
    .get("/success",(req:Request, res:Response)=>{
        return res.status(200).send(`
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body
          style="
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          "
        >
          <button
          onclick="sendDataToReactNativeApp()"
            style="
              padding: 20;
              width: 300;
              font-size: 20;
              color: white;
              background-color: #6751ff;
            "
          >
            Continue with Ride Request....
          </button>
          <script>
            const sendDataToReactNativeApp = async () => {
              window.ReactNativeWebView.postMessage('Success');
            };
          </script>
        </body>
        <html>
        `)
    } )
    .get("/error",(req:Request, res:Response)=>{
        return res.status(200).send("Error")
    } )

    appRouter.use(adminRouter, ridesRouter, customersRouter,driverRouter, indexRouter, authRouter, imagesRouter)
    return appRouter

}
