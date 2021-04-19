import { getLectures } from "../../getters/static";
import { inputGenerator } from "../../helpers/inputGenerator";
import { pickerGenerator } from "../../helpers/pickerGenerator";

export const lectureTitleEntry = inputGenerator("title", "Input Lecture Title", "Lecture Title");
export const lectureStartEntry = inputGenerator("UnlockDate", "Input Lecture Unlock Date", "Lecture Unlock Date", "datetime-local");
export const lectureSummaryEntry = inputGenerator("summary", "Input Lecture Summary", "Lecture Summary");

export const lecturePicker = pickerGenerator("title", "Select a Lecture", getLectures);