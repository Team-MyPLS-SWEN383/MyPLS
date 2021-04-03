import { getRoles, getUsers } from "./static";

export type roleName = "student" | "professor" | "admin";
export const getUsersOfRole = async (targetRole: roleName) => {
  const users = await getUsers();
  const roles = await getRoles();

  let targetRoleId;
  for (const role of roles) {
    if (role.role_name === targetRole) {
      targetRoleId = role.idRoles;
      break;
    }
  }

  return users.filter((user) => {
    return user.Roles_idRoles === targetRoleId;
  })
}