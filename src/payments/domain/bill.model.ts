import { Column } from "typeorm";

export class Billing{
    @Column()
    id!: string

    @Column()
    customer_id!:string

    @Column()
    is_paid_for!: string

    @Column()
    status!: string

    @Column()
    amount!: string

    @Column()
    item!:string

    @Column()
    type!:string

    @Column()
    created_at!: string
}