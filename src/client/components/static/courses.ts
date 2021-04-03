import { getCourses } from "../../getters/static";
import { inputGenerator } from "../../helpers/inputGenerator";
import { pickerGenerator } from "../../helpers/pickerGenerator";

export const courseNameEntry = inputGenerator("coursename", "Course Name", "Enter Course Name");
export const courseCodeEntry = inputGenerator("courseCode", "Course Code", "Enter Course Code");

export const coursePicker = pickerGenerator("coursename", "Select a Course", getCourses);