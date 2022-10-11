import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm"


@Entity("payment_method")
export class  PaymentMethod extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    mode!:string

    @Column({nullable:true})
    vendor?:string

    @CreateDateColumn()
    created_at!:Date
}


