import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { RideType } from "../utils/enums/ride-type.enum"

@Entity("cancelled_ride")
export class  CancelledRide extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    request_id!:string

    @Column()
    cancelled_by!:string

    @Column()
    cancelled_time!:string

    @Column('decimal')
    penalt_fee!:number

    @Column('text')
    reason!:string
}

