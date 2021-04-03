import { getRoles } from "../../getters/static";
import { pickerGenerator } from "../../helpers/pickerGenerator";

export const rolePicker = pickerGenerator("role_name", "Select a Role", getRoles);