import { getDiscussions } from "../../getters/static";
import { inputGenerator } from "../../helpers/inputGenerator";
import { pickerGenerator } from "../../helpers/pickerGenerator";

export const titleEntry = inputGenerator("Discussion_Title", "Discussion Title", "Enter Discussion Title");

export const discussionPicker = pickerGenerator("Discussion_Title", "Select a Discussion", getDiscussions); 