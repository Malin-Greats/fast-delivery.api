import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../auth/domain/user.model";
import { DriverDocuments } from "./driver-docs.model";
import { Vehicle } from "./vehicles.model";
export enum DriverApprovalStatus{
    PENDING="pending",
    APPROVED="approved",
    REJECTED="rejected"
}
export enum RideStatus{
    HAS_RIDE="has_ride",
    NO_RIDE="no_ride"
}
@Entity("driver")
export class  Driver extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string
    
    @Column()
    user_id!:string

    @Column({
        type:"enum",
        enum:RideStatus
    })
    ride_status!:string

    @Column({
        type:"enum",
        enum:DriverApprovalStatus
    })
    approval_status!:DriverApprovalStatus

    @Column({default:0})
    overall_rating!:number

    @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
    vehicles!: Vehicle[]
    
    @Column({nullable:true})
    vehicle_id!:string

    @Column({nullable:true})
    driver_documents_id!:string

    @OneToOne(type => DriverDocuments) @JoinColumn({name:"driver_documents_id"})
   documents!: DriverDocuments;

   @OneToOne(type => User,{eager:true}) @JoinColumn({name:"user_id"})
   user!: User;
}

