import { Column } from "typeorm";

export class CreditCardPayments{
    @Column()
    id!: string

    @Column()
    expiry_date!: string

    @Column()
    card_number!: string

    @Column()
    user_id!: string

    @Column()
    amount!: string

    @Column()
    payment_date!:Date

    @Column()
    created_at!: string
}