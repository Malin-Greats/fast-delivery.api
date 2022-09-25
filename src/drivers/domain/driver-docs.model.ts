import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DriverDocumentsIn } from "./dto/driver-docs.dto";

@Entity("driver_documents")
export class DriverDocuments extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:string

    @Column()
    personalID!:string

    @Column()
    drivers_license!:string

    @Column()
    background_check!:string

    @Column()
    profile_photo!:string

    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date

    @Column({unique:true})
    driver_id!:string
}