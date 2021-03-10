export async function addNewUser() {
  console.log(await (await fetch("/users/")).json());
}