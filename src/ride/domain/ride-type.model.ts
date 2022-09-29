import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn} from "typeorm"

@Entity("ride_type")
export class  RideType extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    vehicle_image!:string

    @Column("int")
    max_passengers!:number

    @Column("float")
    multiplier!:number

    @Column()
    title!:string

    @CreateDateColumn()
    created_at!:Date
}


