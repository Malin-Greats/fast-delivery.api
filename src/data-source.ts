import { DataSource } from "typeorm";
import { Role } from "./auth/domain/role.model";
import { User } from "./auth/domain/user.model"; 
import { UserOTP } from "./auth/domain/otp.model";
import {singleton} from 'tsyringe'
import logger from "./shared/errors/logger";
import { Vehicle } from "./drivers/domain/vehicles.model";
import { Driver } from "./drivers/domain/driver.model";
import { DriverDocuments } from "./drivers/domain/driver-docs.model";

@singleton()
export class psqlDB{
    public static DataSrc: DataSource;
    static init () {
        try {
            psqlDB.DataSrc = new DataSource({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "elfyntan",
                password: "samieF263",
                database: "fastd",
                synchronize: true,
                logging: false,
                entities: [User, Role, UserOTP, Vehicle, Driver,DriverDocuments],
            })
            psqlDB.DataSrc.initialize()
                .then(() => {
                    logger.info("Database connected successfully!")
                })
                .catch((error) => logger.error(`Connection to database failed! ${error}`))
        } catch (error) {
            console.error('[mysql.connector][init][Error]: ', error);
            throw new Error('failed to initialized pool');
        }
    }

    
}
