import { Role } from "../../domain/role.model"

export interface RoleOut{
    ID          :string
    name        :string
    slug?       :string
    createdAt   :Date
}

export function toRoleOut({ID, name,createdAt}:Role):RoleOut{
    let roleOut={ID, name, createdAt}
    return roleOut
}