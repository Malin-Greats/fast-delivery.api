import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Ride } from "./ride.model"

@Entity("cancelled_ride")
export class  CancelledRide extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    ride_id!:string

    @Column()
    cancelled_by!:string

    @Column()
    cancelled_time!:Date

    @Column('decimal')
    penalt_fee!:number

    @Column('text')
    reason!:string

    @OneToOne(type => Ride,{eager:true}) @JoinColumn({name:"ride_id"})
    ride!:Ride
}

