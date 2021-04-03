var Client = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    let courseCache;
    const getCourses = () => __awaiter(void 0, void 0, void 0, function* () {
        return courseCache = courseCache || (yield (yield fetch("/courses", {
            method: "GET"
        })).json());
    });
    let discussionCache;
    const getDiscussions = () => __awaiter(void 0, void 0, void 0, function* () {
        return discussionCache = discussionCache || (yield (yield fetch("/discussions", {
            method: "GET"
        })).json());
    });
    let roleCache;
    const getRoles = () => __awaiter(void 0, void 0, void 0, function* () {
        return roleCache = roleCache || (yield (yield fetch("/roles", {
            method: "GET"
        })).json());
    });
    let userCache;
    const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        return userCache = userCache || (yield (yield fetch("/users", {
            method: "GET"
        })).json());
    });
    let groupCache;
    const getGroups = () => __awaiter(void 0, void 0, void 0, function* () {
        return groupCache = groupCache || (yield (yield fetch("/groups", {
            method: "GET"
        })).json());
    });

    const inputGenerator = (dbName, label, placeholder, inputType = "text", handler) => {
        return (opts) => {
            return `
    <label>
      <b>${label}</b>
      <input onchange="${handler}" type="${inputType}" placeholder="${placeholder}" name="${(opts === null || opts === void 0 ? void 0 : opts.nameOverride) || dbName}" ${((opts === null || opts === void 0 ? void 0 : opts.isRequired) === "false") ? "" : "required"}>
    </label>
    <br/>`;
        };
    };

    const pickerGenerator = (dbName, label, dataProvider, handler) => {
        return (opts) => __awaiter(void 0, void 0, void 0, function* () {
            let dataList = yield dataProvider();
            if (opts === null || opts === void 0 ? void 0 : opts.filterFn)
                dataList = dataList.filter(opts.filterFn);
            if (opts === null || opts === void 0 ? void 0 : opts.options)
                dataList = dataList.filter((item) => {
                    return opts.options.includes(item[dbName]);
                });
            let options = "";
            for (const data of dataList)
                options += `<option value="${data[dbName]}" class="option01">${data[dbName]}</option>`;
            return `
      <label>
        <b>${label}</b>
        <select name="${(opts === null || opts === void 0 ? void 0 : opts.nameOverride) || dbName}" ${((opts === null || opts === void 0 ? void 0 : opts.isRequired) === "false") ? "" : "required"}>
          ${options}
        </select>
      </label>
      <br/>
    `;
        });
    };

    const courseNameEntry = inputGenerator("coursename", "Course Name", "Enter Course Name");
    const courseCodeEntry = inputGenerator("courseCode", "Course Code", "Enter Course Code");
    const coursePicker = pickerGenerator("coursename", "Select a Course", getCourses);

    var courses = /*#__PURE__*/Object.freeze({
        __proto__: null,
        courseNameEntry: courseNameEntry,
        courseCodeEntry: courseCodeEntry,
        coursePicker: coursePicker
    });

    const titleEntry = inputGenerator("Discussion_Title", "Discussion Title", "Enter Discussion Title");
    const discussionPicker = pickerGenerator("Discussion_Title", "Select a Discussion", getDiscussions);

    var discussions = /*#__PURE__*/Object.freeze({
        __proto__: null,
        titleEntry: titleEntry,
        discussionPicker: discussionPicker
    });

    const rolePicker = pickerGenerator("role_name", "Select a Role", getRoles);

    var role = /*#__PURE__*/Object.freeze({
        __proto__: null,
        rolePicker: rolePicker
    });

    const usernameEntry = inputGenerator("username", "Username", "Enter Username");
    const firstNameEntry = inputGenerator("FirstName", "First Name", "Enter First Name");
    const lastNameEntry = inputGenerator("LastName", "Last Name", "Enter Last Name");
    const emailEntry = inputGenerator("Email", "Email I.D", "Enter Email");
    const passwordEntry = inputGenerator("password", "Password", "Enter Temporary Password", "password");
    const userPicker = pickerGenerator("username", "Select a User", getUsers);

    var users = /*#__PURE__*/Object.freeze({
        __proto__: null,
        usernameEntry: usernameEntry,
        firstNameEntry: firstNameEntry,
        lastNameEntry: lastNameEntry,
        emailEntry: emailEntry,
        passwordEntry: passwordEntry,
        userPicker: userPicker
    });

    var staticComponents = Object.assign(Object.assign(Object.assign(Object.assign({}, courses), discussions), role), users);

    const getUsersOfRole = (targetRole) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield getUsers();
        const roles = yield getRoles();
        let targetRoleId;
        for (const role of roles) {
            if (role.role_name === targetRole) {
                targetRoleId = role.idRoles;
                break;
            }
        }
        return users.filter((user) => {
            return user.Roles_idRoles === targetRoleId;
        });
    });

    class UserOfRoleMenu {
        constructor(div) {
            this.div = div;
            this.dependent = this.div.parentElement.querySelector(".rolePicker select");
            this.dependent.onchange = () => { this.render(); };
            this.render();
        }
        render() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!["student", "professor", "admin"].includes(this.dependent.value))
                    return;
                const users = yield getUsersOfRole(this.dependent.value);
                let options = "";
                for (let user of users)
                    options += `<option value="${user.username}" class="option01">${user.username}</option>`;
                this.div.innerHTML = `
      <label>
        <b>Select a User</b>
        <select name="username" required>
          ${options}
        </select>
      </label>
    `;
            });
        }
    }
    const usersOfRolePicker = (target) => {
        return new UserOfRoleMenu(target);
    };

    var usersOfRole = /*#__PURE__*/Object.freeze({
        __proto__: null,
        usersOfRolePicker: usersOfRolePicker
    });

    const changeFormAction = (div, callback) => {
        while (div.tagName != "FORM" && div != document.body) {
            div = div.parentElement;
        }
        div.onsubmit = () => {
            callback(div);
            return false;
        };
    };

    const sendFormData = (endpoint, method, form) => __awaiter(void 0, void 0, void 0, function* () {
        yield fetch(endpoint, {
            method,
            body: JSON.stringify(Object.assign({}, Object.fromEntries((new FormData(form)).entries()))),
            headers: {
                "Content-Type": "application/json"
            },
        });
        location.reload();
    });

    const groupNameEntry = inputGenerator("Name", "Group Name", "Enter Group Name");
    const groupDescriptionEntry = inputGenerator("Description", "Group Description", "Enter Group Description");
    const groupPicker = pickerGenerator("Name", "Select a Group", getGroups);

    class CourseOrGroupAddForm {
        constructor(div) {
            this.div = div;
            const container = document.createElement("div");
            container.innerHTML = `
      <label>
        <b>What would you like to add?</b>
        <select name="contentType" required>
          <option value="course" class="option01"> Course </option>
          <option value="group" class="option01"> Group </option>
        </select>
      </label>
      <p></p>
      <br>`;
            this.div.appendChild(container);
            this.optionContainer = document.createElement("div");
            this.div.appendChild(this.optionContainer);
            this.courseOrDiscussion = container.querySelector("select");
            this.courseOrDiscussion.onchange = () => { this.render(); };
            this.render();
        }
        render() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.courseOrDiscussion.value === "course") {
                    this.optionContainer.innerHTML = `
        ${courseNameEntry()}
        ${courseCodeEntry()}
      `;
                    changeFormAction(this.div, (form) => { sendFormData("/courses", "POST", form); });
                }
                else {
                    this.optionContainer.innerHTML = `
        ${groupNameEntry()}
        ${groupDescriptionEntry()}
      `;
                    changeFormAction(this.div, (form) => { sendFormData("/groups", "POST", form); });
                }
            });
        }
    }
    const courseOrGroupAddForm = (target) => {
        return new CourseOrGroupAddForm(target);
    };

    var courseOrGroupAddForm$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        courseOrGroupAddForm: courseOrGroupAddForm
    });

    class CourseOrGroupModify {
        constructor(div) {
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
            this.courseOrDiscussion.onchange = () => { this.render(); };
            this.render();
        }
        render() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.courseOrDiscussion.value === "course") {
                    this.optionContainer.innerHTML = `
        ${yield coursePicker({
                    nameOverride: "oldCoursename"
                })}
        ${courseNameEntry({
                    nameOverride: "newCoursename"
                })}
      `;
                    changeFormAction(this.div, (form) => sendFormData("/courses", "PATCH", form));
                }
                else {
                    this.optionContainer.innerHTML = `
        ${yield groupPicker({
                    nameOverride: "oldGroupName"
                })}<
        ${groupNameEntry({
                    nameOverride: "newGroupName"
                })}
      `;
                    changeFormAction(this.div, (form) => sendFormData("/groups", "PATCH", form));
                }
            });
        }
    }
    const courseOrGroupModify = (target) => {
        return new CourseOrGroupModify(target);
    };

    var courseOrGroupModify$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        courseOrGroupModify: courseOrGroupModify
    });

    class UserOrCourseDelete {
        constructor(div) {
            this.div = div;
            const container = document.createElement("div");
            container.innerHTML = `
      <label>
        <b>What would you like to delete?</b>
        <select name="contentType" required>
          <option value="user" class="option01"> User </option>
          <option value="course" class="option01"> Course </option>
          <option value="group" class="option01"> Group </option>
          </select>
      </label>
      <p></p>
      <br>`;
            this.div.appendChild(container);
            this.optionContainer = document.createElement("div");
            this.div.appendChild(this.optionContainer);
            this.userOrCourse = container.querySelector("select");
            this.userOrCourse.onchange = () => { this.render(); };
            this.render();
        }
        render() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.userOrCourse.value === "user") {
                    this.optionContainer.innerHTML = `
        ${yield userPicker()}
      `;
                    changeFormAction(this.div, (form) => { sendFormData("/users", "DELETE", form); });
                }
                else if (this.userOrCourse.value === "course") {
                    this.optionContainer.innerHTML = `
        ${yield coursePicker()}
      `;
                    changeFormAction(this.div, (form) => { sendFormData("/courses", "DELETE", form); });
                }
                else {
                    this.optionContainer.innerHTML = `
        ${yield groupPicker()}
      `;
                    changeFormAction(this.div, (form) => { sendFormData("/groups", "DELETE", form); });
                }
            });
        }
    }
    const userOrCourseDelete = (target) => {
        return new UserOrCourseDelete(target);
    };

    var userOrCourseDelete$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        userOrCourseDelete: userOrCourseDelete
    });

    var dynamicComponents = Object.assign(Object.assign(Object.assign(Object.assign({}, usersOfRole), courseOrGroupAddForm$1), courseOrGroupModify$1), userOrCourseDelete$1);

    function addNewUser() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield (yield fetch("/users")).json());
        });
    }
    const getUserData = () => __awaiter(void 0, void 0, void 0, function* () {
        return (yield (yield fetch("/users", {
            method: "GET"
        })).json());
    });
    const getCourseData = () => __awaiter(void 0, void 0, void 0, function* () {
        return (yield (yield fetch("/courses", {
            method: "GET"
        })).json());
    });
    const getDGroupData = () => __awaiter(void 0, void 0, void 0, function* () {
        return (yield (yield fetch("/groups", {
            method: "GET"
        })).json());
    });
    const appendUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield getUserData();
        const contentArea = document.getElementById("content-cards");
        for (const user of users) {
            const myUser = document.createElement("div");
            let src;
            let roleName;
            switch (user.Roles_idRoles) {
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
    });
    const appendCourses = () => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield getCourseData();
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
    });
    const appendDGroups = () => __awaiter(void 0, void 0, void 0, function* () {
        const groups = yield getDGroupData();
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
    });
    const getContent = () => __awaiter(void 0, void 0, void 0, function* () {
        yield appendUsers();
        yield appendCourses();
        yield appendDGroups();
        filterSelection("all");
    });
    const getUserOptions = () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield getUserData();
        let out = "";
        for (const user of users)
            out += `<option value="${user.username}" class="option01">${user.username}</option>`;
        return out;
    });
    const getCourseOptions = () => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield getCourseData();
        let out = "";
        for (const course of courses)
            out += `<option value="${course.coursename}" class="option01">${course.coursename}</option>`;
        return out;
    });
    function deleteUserCourseToggle(el) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetDiv = document.getElementById("user-or-course-container");
            targetDiv.innerHTML = "";
            if (el.value === "user") {
                targetDiv.innerHTML = `
      <label for="username"><b>Which User</b></label>
      <select name="username" id="username" required>
        ${yield getUserOptions()}
      </select>`;
            }
            else {
                targetDiv.innerHTML = `
      <label for="courseName"><b>Which Course</b></label>
      <select name="courseName" id="courseName" required>
        ${yield getCourseOptions()}
      </select>`;
            }
        });
    }
    const loadUserTypeOptions = (t) => __awaiter(void 0, void 0, void 0, function* () {
        const users = (yield getUserData())
            .filter(user => user.Roles_idRoles === t);
        let out = "";
        for (const user of users)
            out += `<option value="${user.username}" class="option01">${user.username}</option>`;
        return out;
    });
    function loadInstructorStudentData(el) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetDiv = document.getElementById("instructor-or-learner");
            targetDiv.innerHTML = "";
            if (el.value === "instructor") {
                targetDiv.innerHTML = `
      <label for="user"><b>Which Learner</b></label>
      <select name="user" id="user" required>
        ${yield loadUserTypeOptions(2)}
      </select>
      <p></p>
      <br>`;
            }
            else {
                targetDiv.innerHTML = `
      <label for="user"><b>Which Instructor</b></label>
      <select name="user" id="user" required>
        ${yield loadUserTypeOptions(3)}
      </select>
      <p></p>
      <br>`;
            }
        });
    }
    const getDGroupOptions = () => __awaiter(void 0, void 0, void 0, function* () {
        const groups = yield getDGroupData();
        let out = "";
        for (const group of groups)
            out += `<option value="${group.Name}" class="option01">${group.Name}</option>`;
        return out;
    });
    function loadCourseDGroupData(el) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetDiv = document.getElementById("course-or-discussion-group");
            targetDiv.innerHTML = "";
            if (el.value === "course") {
                targetDiv.innerHTML = `
      <label for="course"><b>Which Course</b></label>
      <select name="course" id="course" required>
        ${yield getCourseOptions()}
      </select>
      <p></p>
      <br>`;
            }
            else {
                targetDiv.innerHTML = `
      <label for="discussion"><b>Which Discussion Group</b></label>
      <select name="discussion" id="discussion" required>
        ${yield getDGroupOptions()}
      </select>
      <p></p>
      <br>`;
            }
        });
    }
    function deleteHandler(form) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = Object.fromEntries((new FormData(form)).entries());
            const path = (formData.userOrCourse === "user") ? "users" : "courses";
            yield fetch(`/${path}`, {
                method: "DELETE",
                body: JSON.stringify(Object.assign({}, Object.fromEntries((new FormData(form)).entries()))),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            location.reload();
        });
    }
    const generateFieldComponents = () => __awaiter(void 0, void 0, void 0, function* () {
        for (const [fnName, generator] of Object.entries(staticComponents)) {
            const divs = document.getElementsByClassName(fnName);
            for (const div of Array.from(divs)) {
                if (fnName.endsWith("Picker")) {
                    const opts = div.getAttribute("options");
                    if (opts) {
                        div.innerHTML = yield generator({ options: opts.split(",") });
                    }
                    else {
                        div.innerHTML = yield generator();
                    }
                }
                else {
                    const nameOverride = div.getAttribute("nameOverride");
                    const isRequired = div.getAttribute("isRequired");
                    const options = (div.getAttribute("options") || "").split(",");
                    div.innerHTML = yield generator({
                        nameOverride,
                        isRequired,
                        options
                    });
                }
            }
        }
        for (const [fnName, generator] of Object.entries(dynamicComponents)) {
            const divs = document.getElementsByClassName(fnName);
            for (const div of Array.from(divs)) {
                yield generator(div);
            }
        }
    });

    exports.addNewUser = addNewUser;
    exports.deleteHandler = deleteHandler;
    exports.deleteUserCourseToggle = deleteUserCourseToggle;
    exports.generateFieldComponents = generateFieldComponents;
    exports.getContent = getContent;
    exports.loadCourseDGroupData = loadCourseDGroupData;
    exports.loadInstructorStudentData = loadInstructorStudentData;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
//# sourceMappingURL=bundle.js.map
