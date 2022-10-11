import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn} from "typeorm"

@Entity("payfast")
export class  Payfast extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    ref!:string

    @Column()
    url!:string

    @Column("decimal")
    amount!:number

    @Column()
    method!:string

    @Column()
    status!:string

    @CreateDateColumn()
    created_at!:Date
}


