import { changeFormAction } from "../../helpers/changeFormAction";
import { sendFormData } from "../../helpers/sendFormData";
import { coursePicker } from "../static/courses";
import { groupPicker } from "../static/groups";
import { userPicker } from "../static/users";

class UserOrCourseDelete {
  private div: HTMLDivElement;
  private userOrCourse: HTMLSelectElement;
  private optionContainer: HTMLDivElement;
  constructor(div: HTMLDivElement) {
    this.div = div;
    const container = document.createElement("div");
    container.innerHTML = `
      <label>
        <b>What would you like to delete?</b>
        <select name="contentType" required>
          <option value="user" class="option01"> User </option>
          <option value="course" class="option01"> Course </option>
          <option value="group" class="option01"> Group </option>
          </select>
      </label>
      <p></p>
      <br>`;
    this.div.appendChild(container);
    this.optionContainer = document.createElement("div");
    this.div.appendChild(this.optionContainer);
    this.userOrCourse = container.querySelector("select");
    this.userOrCourse.onchange = () => { this.render() };
    this.render();
  }

  async render() {
    if (this.userOrCourse.value === "user") {
      this.optionContainer.innerHTML = `
        ${await userPicker()}
      `;
      changeFormAction(this.div, (form) => { sendFormData("/users", "DELETE", form); })
    } else if (this.userOrCourse.value === "course") {
      this.optionContainer.innerHTML = `
        ${await coursePicker()}
      `;
      changeFormAction(this.div, (form) => { sendFormData("/courses", "DELETE", form); })
    } else {
      this.optionContainer.innerHTML = `
        ${await groupPicker()}
      `;
      changeFormAction(this.div, (form) => { sendFormData("/groups", "DELETE", form); })
    }
  }
}

export const userOrCourseDelete = (target: HTMLDivElement) => {
  return new UserOrCourseDelete(target);
}