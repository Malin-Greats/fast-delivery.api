import "reflect-metadata";
import helmet from "helmet";
import express from "express";
import { appRoutes } from "./routes/app.routes";
import { EnvConfig as env } from "./common/config/env.config";


const app = express()
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
appRoutes(app)
app.listen(env.PORT, ()=>{
    console.log(`Application listening on http://localhost:${env.PORT}`)
})
