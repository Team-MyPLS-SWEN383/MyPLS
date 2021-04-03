import { getUsersOfRole, roleName } from "../../getters/dynamic";

class UserOfRoleMenu {
  private div: HTMLDivElement
  private dependent: HTMLSelectElement;
  constructor(div: HTMLDivElement) {
    this.div = div;
    this.dependent = this.div.parentElement.querySelector(".rolePicker select");
    this.dependent.onchange = () => { this.render() };
    this.render();
  }

  async render() {
    if (!["student", "professor", "admin"].includes(this.dependent.value)) return;
    const users = await getUsersOfRole(this.dependent.value as roleName);

    let options = "";
    for (let user of users)
      options += `<option value="${user.username}" class="option01">${user.username}</option>`;

    this.div.innerHTML = `
      <label>
        <b>Select a User</b>
        <select name="username" required>
          ${options}
        </select>
      </label>
    `
  }
}

export const usersOfRolePicker = (target: HTMLDivElement) => {
  return new UserOfRoleMenu(target);
}