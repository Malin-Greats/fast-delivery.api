import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToOne } from "typeorm"
import { Customer } from "../../customers/domain/customer.model"
import { Place } from "../../shared/dto/location.dto"
import { TravelInfo } from "../../shared/dto/travel-info.dto"
import { RideRequestStatus } from "../utils/enums/request-status.enum"
import { RideType } from "./ride-type.model"

@Entity()
export class  RideRequest extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    customer_id!:string

    @Column('simple-json')
    pick_from!:Place

    @Column('simple-json')
    drop_to!:Place

    @Column({
        type:"enum",
        enum:RideRequestStatus
    })
    request_status!:RideRequestStatus

    @Column()
    travel_time!:string

    @Column('decimal')
    cost!:number

    @Column()
    payment_id!:string

    @Column()
    ride_type_id!:string

    @Column()
    is_paid_for!:boolean
    @Column('simple-json')
    travel_information!:TravelInfo

    @CreateDateColumn()
    created_at!:Date

    @ManyToOne(() => Customer, (customer) => customer.ride_requests)
    @JoinColumn({name:"customer_id"})
    customer!: Customer

    @ManyToOne(type => RideType,{eager:true}) @JoinColumn({name:"ride_type_id"})
    ride_type!:RideType
}

