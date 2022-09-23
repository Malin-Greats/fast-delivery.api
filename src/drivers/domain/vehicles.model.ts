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

export function NewVehicle({model, make,capacity, driver_id, vehicle_insurance_registration, vehicle_technical_certificate, year, color, plate_number}:VehicleIn):Vehicle{
    const vehicle = new Vehicle()
    vehicle.model=model
    vehicle.make= make
    vehicle.year=year
    vehicle.color=color
    vehicle.capacity=capacity
    vehicle.driver_id=driver_id
    vehicle.plate_number=plate_number
    vehicle.vehicle_technical_certificate =vehicle_technical_certificate
    vehicle.vehicle_insurance_registration=vehicle_insurance_registration
    return vehicle
}