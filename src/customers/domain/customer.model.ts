import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Role } from "../../auth/domain/role.model";
import { RideRequest } from "../../ride/domain/ride-request.model";
import { Ride } from "../../ride/domain/ride.model";
import { Person } from "../../shared/entities/person";

@Entity("customers")
export class Customer extends Person{
    @OneToMany(() => Ride, (ride) => ride.customer)
    rides!: Ride[]

    @OneToMany(() => RideRequest, (ride) => ride.customer)
    ride_requests!: RideRequest[]


    @ManyToOne(()=>Role,role =>role.customers,{eager:true})
    @JoinColumn({name:"role_id"})
    role!:Role


}