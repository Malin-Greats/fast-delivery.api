import helmet from "helmet";
import express from "express";
import morgan from 'morgan'
import dotenv from 'dotenv';
import logger from "./shared/errors/logger";
import "reflect-metadata";
import { psqlDB } from "./data-source";
import { AppRoutes } from "./routes/app.routes";
import  cors from 'cors'
import path from "path";

dotenv.config();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

 

psqlDB.init()
const app = express()
app.use(helmet());
app.use(cors(corsOptions) )
app.use(express.json())
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))
app.use(AppRoutes())

app.listen(15000||3000, ()=>{
    logger.info(`Application listening on http://192.168.0.10:${process.env.PORT||3000}`)
})
