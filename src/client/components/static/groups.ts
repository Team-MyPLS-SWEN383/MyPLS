import { getGroups } from "../../getters/static";
import { inputGenerator } from "../../helpers/inputGenerator";
import { pickerGenerator } from "../../helpers/pickerGenerator";

export const groupNameEntry = inputGenerator("Name", "Group Name", "Enter Group Name");
export const groupDescriptionEntry = inputGenerator("Description", "Group Description", "Enter Group Description");

export const groupPicker = pickerGenerator("Name", "Select a Group", getGroups); 