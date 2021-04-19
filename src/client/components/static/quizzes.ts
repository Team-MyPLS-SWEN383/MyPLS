import { getQuizzes } from "../../getters/static";
import { inputGenerator } from "../../helpers/inputGenerator";
import { pickerGenerator } from "../../helpers/pickerGenerator";

export const quizTitleEntry = inputGenerator("Title", "Quiz Title", "Input Quiz Title");
export const quizStartTimeEntry = inputGenerator("StartTime", "Quiz Start Time", "Input Quiz Start Time", "datetime-local");
export const quizEndTimeEntry = inputGenerator("EndTime", "Quiz End Time", "Input Quiz End Time", "datetime-local");

export const quizPicker = pickerGenerator("Title", "Select A Quiz", getQuizzes)