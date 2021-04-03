import { changeFormAction } from "../../helpers/changeFormAction";
import { sendFormData } from "../../helpers/sendFormData";
import { courseCodeEntry, courseNameEntry, coursePicker } from "../static/courses";
import { groupDescriptionEntry, groupNameEntry, groupPicker } from "../static/groups";

class CourseOrGroupModify {
  private div: HTMLDivElement;
  private courseOrDiscussion: HTMLSelectElement;
  private optionContainer: HTMLDivElement;
  constructor(div: HTMLDivElement) {
    this.div = div;
    const container = document.createElement("div");
    container.innerHTML = `
      <label>
        <b>What would you like to modify?</b>
        <select name="contentType" required>
          <option value="course" class="option01"> Course </option>
          <option value="group" class="option01"> Groups </option>
        </select>
      </label>
      <p></p>
      <br>`;
    this.div.appendChild(container);
    this.optionContainer = document.createElement("div");
    this.div.appendChild(this.optionContainer);
    this.courseOrDiscussion = container.querySelector("select");
    console.log(this.courseOrDiscussion);
    this.courseOrDiscussion.onchange = () => { this.render() };
    this.render();
  }

  async render() {
    if (this.courseOrDiscussion.value === "course") {
      this.optionContainer.innerHTML = `
        ${await coursePicker({
          nameOverride: "oldCoursename"
        })}
        ${courseNameEntry({
          nameOverride: "newCoursename"
        })}
      `;
      changeFormAction(this.div, (form) => sendFormData("/courses", "PATCH", form))
    } else {
      this.optionContainer.innerHTML = `
        ${await groupPicker({
          nameOverride: "oldGroupName"
        })}<
        ${groupNameEntry({
          nameOverride: "newGroupName"
        })}
      `;
      changeFormAction(this.div, (form) => sendFormData("/groups", "PATCH", form))
    }
  }
}

export const courseOrGroupModify = (target: HTMLDivElement) => {
  return new CourseOrGroupModify(target);
}