import { UserProfile } from "../../../shared/dto/profile.dto"
import { Customer } from "../customer.model";

export interface CustomerProfile extends UserProfile{
    role:string
}

export function toCustomerProfile({firstname, lastname, email, phone_number, profile_photo, online_status, rating, role}:Customer):CustomerProfile{
    const roleName = role.name
    const profile: CustomerProfile={firstname, lastname, email, phone_number, profile_photo, rating, role:roleName}
    return profile
}

