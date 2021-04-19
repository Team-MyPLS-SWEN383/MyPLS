export async function addNewUser() {
  console.log(await (await fetch("/users")).json());
}

let userData;
const getUserData = async () => {
  return userData || await (await fetch("/users", {
    method: "GET"
  })).json();
}

let courseData;
const getCourseData = async () => {
  return courseData || await (await fetch("/courses", {
    method: "GET"
  })).json();
}

let DGroupData;
const getDGroupData = async () => {
  return DGroupData || await (await fetch("/groups", {
    method: "GET"
  })).json();
}

const appendUsers = async () => {
  const users = await getUserData();
  const contentArea = document.getElementById("content-cards");

  for (const user of users) {
    const myUser = document.createElement("div");
    let src;
    let roleName;
    switch(user.Roles_idRoles) {
      case 1:
        continue;
      case 2:
        src = "media/instructor.png";
        roleName = "professor";
        break;
      case 3:
        src = "media/student.png";
        roleName = "student";
    }

    myUser.className = `filterDiv ${roleName}`;
    myUser.innerHTML = `
    <div class="card">
      <img src="${src}" alt="Available Instructor" style="width:100%">
      <div class="container">
        <h4><b>${user.username}</b></h4>
      </div>
    </div>`;

    contentArea.appendChild(myUser);
  }
}

const appendCourses = async () => {
  const courses = await getCourseData();

  const contentArea = document.getElementById("content-cards");

  for (const course of courses) {
    const myCourse = document.createElement("div");
    myCourse.className = `filterDiv course`;
    myCourse.innerHTML = `
    <div class="card">
      <img src="media/course.png" alt="Available Courses" style="width:100%">
      <div class="container">
        <h4><b>${course.coursename}</b></h4>
      </div>
    </div>`;

    contentArea.appendChild(myCourse);
  }
}

const appendDGroups = async () => {
  const groups = await getDGroupData();

  const contentArea = document.getElementById("content-cards");

  for (const group of groups) {
    const myCourse = document.createElement("div");
    myCourse.className = `filterDiv discussions`;
    myCourse.innerHTML = `
    <div class="card">
      <img src="media/discussion.png" alt="Discussion Group" style="width:100%">
      <div class="container">
        <h4><b>${group.Name}</b></h4>
      </div>
    </div>`;

    contentArea.appendChild(myCourse);
  }
}

// TODO: separate these into their own files
declare function filterSelection(filter: string);
export const getAdminContent = async () => {
  await appendUsers();
  await appendCourses();
  await appendDGroups();

  filterSelection("all");
}

const getUserOptions = async () => {
  const users = await getUserData();
  let out = "";
  for (const user of users) 
    out += `<option value="${user.username}" class="option01">${user.username}</option>`
  return out;
}

const getCourseOptions = async () => {
  const courses = await getCourseData();
  let out = "";
  for (const course of courses)
    out += `<option value="${course.coursename}" class="option01">${course.coursename}</option>`
  return out;
}

export async function deleteUserCourseToggle(el) {
  const targetDiv = document.getElementById("user-or-course-container");
  targetDiv.innerHTML = "";
  if (el.value === "user") {
    targetDiv.innerHTML = `
      <label for="username"><b>Which User</b></label>
      <select name="username" id="username" required>
        ${await getUserOptions()}
      </select>`;
  } else {
    targetDiv.innerHTML = `
      <label for="courseName"><b>Which Course</b></label>
      <select name="courseName" id="courseName" required>
        ${await getCourseOptions()}
      </select>`;
  }
}

const loadUserTypeOptions = async (t: 1 | 2 | 3) => {
  const users = (await getUserData())
    .filter(user => user.Roles_idRoles === t);

  let out = "";
  for (const user of users) 
    out += `<option value="${user.username}" class="option01">${user.username}</option>`
  return out;
}

export async function loadInstructorStudentData(el) {
  const targetDiv = document.getElementById("instructor-or-learner");
  targetDiv.innerHTML = "";
  if (el.value === "instructor") {
    targetDiv.innerHTML = `
      <label for="user"><b>Which Learner</b></label>
      <select name="user" id="user" required>
        ${await loadUserTypeOptions(2)}
      </select>
      <p></p>
      <br>`;
  } else {
    targetDiv.innerHTML = `
      <label for="user"><b>Which Instructor</b></label>
      <select name="user" id="user" required>
        ${await loadUserTypeOptions(3)}
      </select>
      <p></p>
      <br>`;
  }
}

const getDGroupOptions = async () => {
  const groups = await getDGroupData();
  let out = "";
  for (const group of groups) 
    out += `<option value="${group.Name}" class="option01">${group.Name}</option>`;
  return out;
}

export async function loadCourseDGroupData(el) {
  const targetDiv = document.getElementById("course-or-discussion-group");
  targetDiv.innerHTML = "";
  if (el.value === "course") {
    targetDiv.innerHTML = `
      <label for="course"><b>Which Course</b></label>
      <select name="course" id="course" required>
        ${await getCourseOptions()}
      </select>
      <p></p>
      <br>`;
  } else {
    targetDiv.innerHTML = `
      <label for="discussion"><b>Which Discussion Group</b></label>
      <select name="discussion" id="discussion" required>
        ${await getDGroupOptions()}
      </select>
      <p></p>
      <br>`;
  }
}

export async function deleteHandler(form: HTMLFormElement) {
  const formData = Object.fromEntries(((new FormData(form)) as any).entries());
  const path = (formData.userOrCourse === "user") ? "users" : "courses";
  await fetch(`/${path}`, {
    method: "DELETE",
    body: JSON.stringify({
      ...Object.fromEntries(((new FormData(form)) as any).entries())
    }),
    headers: {
      "Content-Type": "application/json"
    },
  });
  location.reload();
}