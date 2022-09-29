import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/domain/user.model";
import { Ride } from "../../ride/domain/ride.model";
import { DriverApprovalStatus  as ApprovalStatus} from "../utilts/enums/driver-approval-status.enum";
import { DriverRidingStatus  as RidingStatus} from "../utilts/enums/driver-riding-status.enum";
import { DriverDocuments } from "./driver-docs.model";
import { Vehicle } from "./vehicles.model";

@Entity("driver")
export class  Driver extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    user_id!:string

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

    @Column({default:0})
    overall_rating!:number

    @OneToMany(() => Vehicle, (vehicle) => vehicle.driver, {eager:true})
    vehicles!: Vehicle[]
    
    @Column({nullable:true})
    vehicle_id!:string

    @Column({nullable:true})
    driver_documents_id!:string

    @OneToOne(type => DriverDocuments,{eager:true}) @JoinColumn({name:"driver_documents_id"})
   documents!: DriverDocuments;

   @OneToOne(type => User,{eager:true}) @JoinColumn({name:"user_id"})
   user!: User;

   @OneToMany(() => Ride, (rides) => rides.driver)
    rides!: Ride[]
}

