import { Entity, BaseEntity, PrimaryGeneratedColumn, Column} from "typeorm"
import { RideStatus } from "../utils/enums/ride-status.enum"
import { RideType } from "../utils/enums/ride-type.enum"

@Entity("ride")
export class  Ride extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string
    
    @Column()
    customer_id!:string

    @Column()
    driver_id!:string

    @Column()
    pick_from!:string
    
    @Column()
    drop_to!:string

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

    @Column({
        type:"enum",
        enum:RideType
    })
    ride_type!:RideType

    @Column({default:false})
    is_payed_for!:boolean

    @Column({default:0})
    rating!:number
}


