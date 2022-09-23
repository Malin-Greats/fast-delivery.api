import { Role } from "../../domain/role.model"

export interface RoleOut{
    id          :string
    name        :string
    slug?       :string
    created_at   :Date
}

export function toRoleOut({id, name,created_at}:Role):RoleOut{
    let roleOut={id, name, created_at}
    return roleOut
}