import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Driver } from "./driver.model";

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

    @Column({unique:true})
    plate_number!:string

    @Column()
    color!:string

    @Column()
    driver_id!:string

    @ManyToOne(() => Driver, (driver) => driver.vehicles)
    @JoinColumn({name:"driver_id"})
    driver!: Driver

    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date
}
