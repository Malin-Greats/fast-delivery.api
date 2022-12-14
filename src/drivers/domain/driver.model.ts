import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from "typeorm";
import { Role } from "../../auth/domain/role.model";
import { Ride } from "../../ride/domain/ride.model";
import { Person } from "../../shared/entities/person";
import { DriverApprovalStatus  as ApprovalStatus} from "../utilts/enums/driver-approval-status.enum";
import { DriverRidingStatus  as RidingStatus} from "../utilts/enums/driver-riding-status.enum";
import { DriverDocuments } from "./driver-docs.model";
import { Vehicle } from "./vehicles.model";

@Entity("driver")
export class  Driver extends Person{
    @Column()
    national_id!:string

    @Column({
        type:"enum",
        enum:RidingStatus
    })
    ride_status!:string

    @Column({
        type:"enum",
        enum:ApprovalStatus
    })
    approval_status!:ApprovalStatus
    //liar affair
    // @OneToMany(() => Ride, (ride) => ride.driver)
    // rides!: Ride[]
    @OneToMany(() => Ride, (ride) => ride.customer)
    rides!: Ride[]

    @OneToOne(() => DriverDocuments,(documents) => documents.driver)
    documents!: DriverDocuments

    @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
    vehicles!: Vehicle[]

    @ManyToOne(()=>Role,role =>role.drivers,{eager:true})
    @JoinColumn({name:"role_id"})
    role!:Role
}

