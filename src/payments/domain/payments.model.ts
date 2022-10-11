import { Column } from "typeorm";

export class Payments{
    @Column()
    id!: string

    @Column()
    mode!: string

    @Column()
    type!: string

    @Column()
    status!: string

    @Column()
    amount!: string

    @Column()
    payment_date!:Date

    @Column()
    created_at!: string
}