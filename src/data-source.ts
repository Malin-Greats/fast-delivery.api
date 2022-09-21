import { DataSource } from "typeorm";
import { Role } from "./auth/domain/role.model";
import { User } from "./auth/domain/user.model"; 
import { UserOTP } from "./auth/domain/otp.model";
import {singleton} from 'tsyringe'

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
                database: "uber_app",
                synchronize: true,
                logging: false,
                entities: [User, Role, UserOTP],
            })
            psqlDB.DataSrc.initialize()
                .then(() => {
                    console.log("TypeORM initialized successfully!")
                })
                .catch((error) => console.error(`TypeORM initialization failed! ${error}`))
        } catch (error) {
            console.error('[mysql.connector][init][Error]: ', error);
            throw new Error('failed to initialized pool');
        }
    }
}
