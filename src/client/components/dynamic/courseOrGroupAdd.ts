import { changeFormAction } from "../../helpers/changeFormAction";
import { sendFormData } from "../../helpers/sendFormData";
import { courseCodeEntry, courseNameEntry } from "../static/courses";
import { groupDescriptionEntry, groupNameEntry } from "../static/groups";
import { usernameEntry } from "../static/users";

class CourseOrGroupAddForm {
  private div: HTMLDivElement;
  private courseOrDiscussion: HTMLSelectElement;
  private optionContainer: HTMLDivElement;
  constructor(div: HTMLDivElement) {
    this.div = div;
    const container = document.createElement("div");
    container.innerHTML = `
      <label>
        <b>What would you like to add?</b>
        <select name="contentType" required>
          <option value="course" class="option01"> Course </option>
          <option value="group" class="option01"> Group </option>
        </select>
      </label>
      <p></p>
      <br>`;
    this.div.appendChild(container);
    this.optionContainer = document.createElement("div");
    this.div.appendChild(this.optionContainer);
    this.courseOrDiscussion = container.querySelector("select");
    this.courseOrDiscussion.onchange = () => { this.render() };
    this.render();
  }

  async render() {
    if (this.courseOrDiscussion.value === "course") {
      this.optionContainer.innerHTML = `
        ${courseNameEntry()}
        ${courseCodeEntry()}
        ${usernameEntry()}
      `;
      changeFormAction(this.div, (form) => { sendFormData("/courses", "POST", form); })
    } else {
      this.optionContainer.innerHTML = `
        ${groupNameEntry()}
        ${groupDescriptionEntry()}
      `;
      changeFormAction(this.div, (form) => { sendFormData("/groups", "POST", form); })
    }
  }
}

export const courseOrGroupAddForm = (target: HTMLDivElement) => {
  return new CourseOrGroupAddForm(target);
}