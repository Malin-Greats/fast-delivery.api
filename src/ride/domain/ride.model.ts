import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne} from "typeorm"
import { Driver } from "../../drivers/domain/driver.model"
import { Place } from "../../shared/dto/location.dto"
import { TravelInfo } from "../../shared/dto/travel-info.dto"
import { RideStatus } from "../utils/enums/ride-status.enum"
import { RideRequest } from "./ride-request.model"

@Entity("rides")
export class  Ride extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string
    
    @Column()
    request_id!:string

    @Column()
    customer_id!:string

    @Column()
    driver_id!:string

    @Column('json')
    pick_from!:Place

    @Column('json')
    drop_to!:Place

    @Column()
    accepted_at!:Date

    @Column({nullable:true})
    start_time?:Date

    @Column({nullable:true})
    end_time?:Date

    @Column('decimal')
    ride_cost!:number

    @Column({
        type:"enum",
        enum:RideStatus
    })
    ride_status!:RideStatus

    @Column()
    ride_type_id!:string

    @Column({default:false})
    is_paid_for!:boolean

    @Column('json')
    travel_information!:TravelInfo

    @Column({default:0})
    rating?:number

    @ManyToOne(() => Driver, (driver) => driver.rides)
    @JoinColumn({name:"driver_id"})
    driver!: Driver

    @OneToOne(type => RideRequest,) @JoinColumn({name:"request_id"})
    request!:RideRequest
}


