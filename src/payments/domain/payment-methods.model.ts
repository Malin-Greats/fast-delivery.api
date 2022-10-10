import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn} from "typeorm"


@Entity("payment")
export class  Payment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    method!:string

    @Column()
    date!:Date

    @Column("decimal")
    amount!:number

    @Column()
    status!:string

    @CreateDateColumn()
    created_at!:Date
}


