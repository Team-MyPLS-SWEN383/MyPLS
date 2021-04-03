import { getUsers } from "../../getters/static";
import { inputGenerator } from "../../helpers/inputGenerator";
import { pickerGenerator } from "../../helpers/pickerGenerator";

export const usernameEntry = inputGenerator("username", "Username", "Enter Username");
export const firstNameEntry = inputGenerator("FirstName", "First Name", "Enter First Name");
export const lastNameEntry = inputGenerator("LastName", "Last Name", "Enter Last Name");
export const emailEntry = inputGenerator("Email", "Email I.D", "Enter Email");
export const passwordEntry = inputGenerator("password", "Password", "Enter Temporary Password", "password");

export const userPicker = pickerGenerator("username", "Select a User", getUsers);