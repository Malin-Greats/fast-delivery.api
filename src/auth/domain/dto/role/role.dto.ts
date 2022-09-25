import { Role } from "../../role.model"
export interface RoleIn{
    name    :string;
    slug?   :string;
}

export interface RoleOut{
    id          :string
    name        :string
    slug?       :string
    created_at   :Date
}
export function toNewRole({name, slug}:RoleIn):Role{
    const role = new Role()
    role.created_at = new Date()
    role.slug=slug
    role.name=name
    return role
}

export function toRoleOut({id, name,created_at}:Role):RoleOut{
    let roleOut={id, name, created_at}
    return roleOut
}
