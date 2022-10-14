import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Driver } from "./driver.model";
import { DriverDocumentsIn } from "./dto/driver-docs.dto";

@Entity("driver_documents")
export class DriverDocuments extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:string

    @Column()
    national_id!:string

    @Column()
    drivers_license!:string

    @Column()
    defensive_drivers_license!:string

    @Column()
    police_clearance!:string

    @Column()
    vehicle_technical_certificate!:string

    @Column()
    vehicle_insurance_registration!:string

    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date

    @Column({unique:true})
    driver_id!:string

    @OneToOne(() => Driver,(driver) => driver.documents, {onDelete:"CASCADE"})
    @JoinColumn({name:"driver_id"})
    driver!: Driver
}