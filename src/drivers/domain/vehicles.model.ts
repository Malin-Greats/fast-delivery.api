import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Driver } from "./driver.model";
import { VehicleIn } from "./dto/vehicle.dto";

@Entity("vehicle")
export class  Vehicle extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string
    
    @Column()
    model!:string

    @Column()
    make!:string

    @Column()
    year!:string 

    @Column()
    capacity!:string

    @Column({unique:true})
    plate_number!:string

    @Column()
    color!:string

    @Column()
    driver_id!:string
    //douments
    @Column()
    vehicle_technical_certificate!:string
    
    @Column()
    vehicle_insurance_registration!:string

    @ManyToOne(() => Driver, (driver) => driver.vehicles)
    @JoinColumn({name:"driver_id"})
    driver!: Driver

    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date
}
