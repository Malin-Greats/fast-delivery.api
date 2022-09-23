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
export function NewDriverDocuments({driver_id, personalID, drivers_license, background_check, profile_photo}:DriverDocumentsIn):DriverDocuments{
    const documents = new DriverDocuments()
    documents.driver_id=driver_id
    documents.drivers_license=drivers_license
    documents.profile_photo=profile_photo
    documents.personalID=personalID
    documents.background_check=background_check
    return documents
}