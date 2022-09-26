import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { RideType } from "../utils/enums/ride-type.enum"

@Entity("ride_request")
export class  RideRequest extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string
    
    @Column()
    customer_id!:string

    @Column()
    pick_from!:string
    
    @Column()
    drop_to!:string

    @Column()
    request_time!:Date

    @Column('decimal')
    est_cost!:number

    @Column({
        type:"enum",
        enum:RideType
    })
    ride_type!:RideType
}

