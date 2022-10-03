import { DataSource } from "typeorm";
import { Role } from "./auth/domain/role.model";
import { UserOTP } from "./auth/domain/otp.model";
import {singleton} from 'tsyringe'
import logger from "./shared/errors/logger";
import { Vehicle } from "./drivers/domain/vehicles.model";
import { Driver } from "./drivers/domain/driver.model";
import { DriverDocuments } from "./drivers/domain/driver-docs.model";
import { CancelledRide } from "./ride/domain/cancelled-ride-request.model";
import { RideRequest } from "./ride/domain/ride-request.model";
import { Ride } from "./ride/domain/ride.model";
import { RideType } from "./ride/domain/ride-type.model";
import { Customer } from "./customers/domain/customer.model";
import { Admin } from "./admin/domain/admin.model";

@singleton()
export class psqlDB{
    public static DataSrc: DataSource;
    static init () {
        try {
            psqlDB.DataSrc = new DataSource({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "postgres",
                database: "fastd_testing",
                synchronize: true,
                logging: false,
                entities: [UserOTP,Role,Admin,Customer,Driver, Vehicle ,DriverDocuments,Ride, CancelledRide, RideRequest, RideType, ],
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
