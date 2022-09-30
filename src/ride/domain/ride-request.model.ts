import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"
import { Place } from "../../shared/dto/location.dto"
import { TravelInfo } from "../../shared/dto/travel-info.dto"
import { RideRequestStatus } from "../utils/enums/request-status.enum"

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
}

