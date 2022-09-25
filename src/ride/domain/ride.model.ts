import { Entity, BaseEntity, PrimaryGeneratedColumn, Column} from "typeorm"
import { RideStatus, RideType } from "../utils/enums/ride-type.enum"
import { Location } from "../utils/types/location.type"
import { RideIn, RideOut } from "./dto/ride.dto"

@Entity("ride")
export class  Ride extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string
    
    @Column()
    customer_id!:string

    @Column()
    driver_id!:string

    @Column()
    pickFrom!:Location
    
    @Column()
    drop_to!:Location

    @Column()
    start_time!:Date

    @Column()
    end_time!:Date

    @Column('decimal')
    ride_cost!:number

    @Column({
        type:"enum",
        enum:RideStatus
    })
    ride_status!:RideStatus

    @Column({
        type:"enum",
        enum:RideType
    })
    ride_type!:RideType

    @Column()
    is_payed_for!:boolean

    @Column({default:0})
    rating!:number
}


export function NewRide(rideIn:RideIn):Ride{
    const newRide = new Ride()
    return newRide
}

export function toRideOut(ride:Ride):RideOut{
    const rideOut:RideOut=ride
    return rideOut
}