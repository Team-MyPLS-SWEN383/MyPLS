'use strict';

var sirv = require('sirv');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql2/promise');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var sirv__default = /*#__PURE__*/_interopDefaultLegacy(sirv);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var bodyParser__default = /*#__PURE__*/_interopDefaultLegacy(bodyParser);
var session__default = /*#__PURE__*/_interopDefaultLegacy(session);

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

class DatabaseHandler {
    constructor() {
        this.pool = mysql.createPool({
            connectionLimit: 25,
            host: 'localhost',
            user: 'mypls',
            password: 'mypls123',
            database: 'mypls'
        });
    }
    /**
     * logs the role of the specified username to the console
     * @param username name of user to get role of
     */
    displayRole(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT role_name FROM roles WHERE idRoles IN (SELECT Roles_idRoles FROM user WHERE username = ?)";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [username]);
            JSON.stringify(result);
            console.log(result[0]['role_name']);
            connection.release();
        });
    }
    /**
     * Gets the ID of a user to be used in other functions
     * @param username Name of user to fetch ID
     * @returns ID of User
     */
    getUserId(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT idUser FROM user WHERE username = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [username]);
            connection.release();
            return result[0]["idUser"];
        });
    }
    /**
     * Gets the id of a group to be used in other functions
     * @param title name of group to get id for
     * @returns id of gorup
     */
    getGroupId(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT idGroup From group WHERE Name = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [title]);
            connection.release();
            return result[0]['idGroup'];
        });
    }
    /**
     * Checks if a username already exists in the database. If so, return an error. Otherwise, create the new user
     * @param username the username to get
     */
    checkNewUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT username FROM user WHERE username = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [username]);
            connection.release();
            return result.length > 0;
        });
    }
    /**
     * Method to get list of users in the database
     * @returns list of users in the database
     */
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM user";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query);
            connection.release();
            return result;
        });
    }
    /**
     * Method to get list of *all* courses in the database
     * @returns Array of courses in database
     */
    getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM courses";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query);
            connection.release;
            return result;
        });
    }
    /**
     * Method to get list of *all* groups in the database
     * @returns Array of groups that exist in the database
     */
    getGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM `group`";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query);
            connection.release();
            return result;
        });
    }
    /**
     * Method to get list of all discussions in the database
     * @returns Array of discussions
     */
    getDiscussions() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "select * from discussions";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query);
            connection.release();
            return result;
        });
    }
    /**
     * Method to get all posts within the database
     * @returns Array of posts
     */
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM post";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query);
            connection.release();
            return result;
        });
    }
    /**
     * Inserts a new user into the user table with their provided information
     * called after checking if they already exist
     * @param username new user's username
     * @param password new user's password
     * @param roleId roleID of new user
     * @param firstName first name of user
     * @param lastName last name of user
     * @param email email of user
     * @returns true if successful, false if an error occurs
     */
    addUser(username, password, roleId, firstName, lastName, email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.checkNewUser(username))) {
                const query = "INSERT INTO user (username, password, Roles_idRoles,FirstName,LastName,Email) VALUES(?, ?, ?,?,?,?)";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [username, password, roleId, firstName, lastName, email]);
                console.log(`inserted new user: ${username}`);
                connection.release();
                return true;
            }
            else {
                console.log("user already exists!");
                return false;
            }
        });
    }
    /**
     * Deletes a user from the users table given their username
     * @param username name of user to delete
     */
    deleteUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkNewUser(username)) {
                const query = "DELETE FROM user WHERE username = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [username]);
                console.log(`deleted user: ${username}`);
                connection.release();
                return true;
            }
            else {
                console.log(`user ${username} doesn't exist!`);
                return false;
            }
        });
    }
    /**
     * Check if course already exists in database
     * @param coursename name of course to check database for
     * @returns the results of the check
     */
    checkNewCourse(coursename) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT coursename FROM courses WHERE coursename = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [coursename]);
            connection.release();
            return result.length > 0;
        });
    }
    /**
     * Adds a course from the courses table given coursename
     * @param coursename
     */
    // FIXME: handle "User_idUser" field
    addCourse(coursename, courseCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.checkNewCourse(coursename))) {
                const query = "INSERT INTO courses (coursename,courseCode) VALUES(?,?)";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [coursename, courseCode]);
                console.log(`inserted new course: ${coursename}`);
                connection.release();
                return true;
            }
            else {
                console.log("Course already exists!");
                return false;
            }
        });
    }
    /**
     * Deletes a course from the courses table given coursename
     * @param coursename name of course to delete
     * @returns true if successful, false if an error occurs
     */
    deleteCourse(coursename) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkNewCourse(coursename)) {
                const query = "DELETE FROM courses WHERE coursename = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [coursename]);
                console.log(`Deleted course: ${coursename}`);
                connection.release();
                return true;
            }
            else {
                console.log(`Course ${coursename} doesn't exist!`);
                return false;
            }
        });
    }
    /**
     * Update course name
     * @param coursename course to be modified
     * @param newCourseName name to replace with
     * @returns true if changed, false if error
     */
    updateCourseName(coursename, newCourseName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkNewCourse(coursename)) {
                const query = "UPDATE courses SET coursename = ? WHERE coursename = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [newCourseName, coursename]);
                console.log(`Updated course: ${coursename}`);
                connection.release();
                return true;
            }
            else {
                console.log(`Course ${coursename} doesn't exist!`);
                return false;
            }
        });
    }
    /**
     * Update the instructor for a course
     * @param coursename name to modify course instructor
     * @param instructor name of instructor
     * @returns true if successful, false if an error occurs
     *
     * NEED TO REWORK so it gets instructor ID then assign it to course
     */
    updateCourseInstructor(coursename, instructor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkNewCourse(coursename)) {
                const query = "UPDATE courses SET instructor = ? WHERE coursename = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [instructor, coursename]);
                console.log(`Updated course: ${coursename}`);
                connection.release();
                return true;
            }
            else {
                console.log(`Course ${coursename} doesn't exist!`);
                return false;
            }
        });
    }
    /**
     * Check if discussion group already exists when creating a group
     * @param name name of discussion group to check
     * @returns length of result array
     */
    checkDiscussionGroup(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT Name FROM MyPLS.group WHERE name = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [name]);
            connection.release();
            return result.length > 0;
        });
    }
    /**
     * Gets the id of a discussion based on the title
     * @param groupTitle title of discussion topic
     * @returns id of topic
     */
    getDiscussionId(groupTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT idDiscussions FROM discussions WHERE Discussion_Title = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [groupTitle]);
            return result[0]['idDiscussions'];
        });
    }
    /**
     * Creates a discussion within a discussion group
     * @param discussionTitle name of discussion topic
     * @param summary summary of disucssion topic
     * @param groupName name of group the discussion is associated with
     * @returns true if successful, false if error
     */
    createDiscussion(discussionTitle, summary, groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = yield this.getGroupId(groupName);
            const query = "INSERT INTO Discussions (Discussion_Title,Summary,Group_idGroup) VALUES (?,?,?);";
            const connection = yield this.pool.getConnection();
            yield connection.query(query, [discussionTitle, summary, groupId]);
            return true;
        });
    }
    /**
     * Create a new discussion group
     * @param name Name of group to be created
     * @param description optional description to be inserted
     * @returns true if successful, false if error occurs
     */
    createDiscussionGroup(name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.checkDiscussionGroup(name))) {
                const query = "INSERT INTO MyPLS.Group (Name, Description) VALUES (?,?);";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [name, description]);
                console.log("Created discussion group!");
                connection.release();
                return true;
            }
            else {
                console.log(`Discussion group ${name} exists`);
                return false;
            }
        });
    }
    /**
     * Searches for discussion given parameter
     * @param keywords keyword to query database with
     * @returns list of results from the db
     */
    searchDiscussion(keywords) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM discussions WHERE Discussion_Title LIKE '?'";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [keywords]);
            connection.release();
            return result.length > 0;
        });
    }
    /**
     * Add a user of any kind to a group
     * @param username name of user to add to group
     * @param group name of group to add user to
     * @returns true if user is added, false if error
     */
    addUserToDiscussion(username, group) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkDiscussionGroup(group)) {
                const userId = yield this.getUserId(username);
                const groupId = yield this.getGroupId(group);
                const query = "INSERT INTO MemberList (Group_idGroup, User_idUser) VALUES (?,?)";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [userId, groupId]);
                connection.release();
                return true;
            }
            else {
                console.log(`Group ${group} doest not exist`);
                return false;
            }
        });
    }
    /**
     * Remove a user from a discussion group
     * @param username name of user to remove
     * @param group what group to remove user from
     * @returns true if user is sucessfully removed, false if error
     */
    removeStudentFromDiscussion(username, group) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkDiscussionGroup(group)) {
                const userId = yield this.getUserId(username);
                const groupId = yield this.getGroupId(group);
                const query = "DELETE FROM MemberList WHERE User_idUser = ? AND Group_idGroup = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [userId, groupId]);
                connection.release();
                return true;
            }
            else {
                console.log(`Group ${group} does not exist`);
                return false;
            }
        });
    }
    /**
     * Creates a disucssion post under a discussion group given the proper parameters
     * @param title title of post
     * @param content content of post
     * @param discussionTitle title of discussion this post falls under
     * @param username name of user creating post
     * @returns true if successful, false if not
     */
    createDiscussionPost(title, content, discussionTitle, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussionId = yield this.getDiscussionId(discussionTitle);
            const userId = yield this.getUserId(username);
            const query = "INSERT INTO Post (Title, Content, Discussions_idDiscussions, User_idUser) VALUES (?, ?, ?, ?)";
            const connection = yield this.pool.getConnection();
            yield connection.query(query, [title, content, discussionId, userId]);
            connection.release();
            return true;
        });
    }
    /**
     * Gets discussion posts in a discussion group given the discussion title
     * @param discussionTitle title of discussion to pull up posts for
     * @returns result array containing post title,content, and username of posts
     */
    getDiscussionPosts(discussionTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT P.title, P.content, U.username FROM Post P INNER JOIN user U ON P.User_idUser = U.idUser WHERE discussions_idDiscussions = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [discussionTitle]);
            connection.release();
            return result;
        });
    }
    /**
     * Rate a specified user with a number and any additional comments
     * @param userRated name of user to be rated
     * @param rating number specifying rating
     * @param comment any additional comments a user has to make on that person
     * @returns true if successful, false if error
     */
    rateUser(userRated, rating, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield this.getUserId(userRated);
            const query = "INSERT INTO Ratings (User_idUser, ratingNumber, Comment) VALUES (?, ?, ?)";
            const connection = yield this.pool.getConnection();
            yield connection.query(query, [userId, rating, comment]);
            connection.release();
            return true;
        });
    }
    /**
     * Gets the ratings of a user based on the username provided
     * @param username name of user to fetch ratings for
     * @returns array containing score and comments of specified user
     */
    getRatings(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT R.ratingNumber, R.Comment FROM ratings R INNER JOIN user U ON R.User_idUser = U.idUser WHERE U.username = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [username]);
            connection.release();
            return result;
        });
    }
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM roles";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query);
            connection.release();
            return result;
        });
    }
}

var roleNameToId = (name) => {
    switch (name) {
        case "administrator":
            return 1;
        case "instructor":
        case "inst":
        case "professor":
        case "prof":
            return 2;
        case "learner":
        case "student":
        case "stu":
            return 3;
        default:
            return -1;
    }
};

// TODO: account for other roles
var auth = (req, res, next) => {
    if (req.session["role"] == "admin")
        return next();
    else {
        res.status(403);
        res.redirect("/login");
        return;
    }
};

const roleRoutes = (app, DB) => {
    app.route("/roles")
        .get(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send(yield DB.getRoles()).end();
    }));
};

const courseRoutes = (app, DB) => {
    app.route("/courses")
        .get(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.send(yield DB.getCourses()).end();
    }))
        .post(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { coursename, courseCode } = req.body;
        yield DB.addCourse(coursename, courseCode);
        res.status(200);
        res.redirect(".");
    }))
        .delete(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { coursename } = req.body;
        yield DB.deleteCourse(coursename);
        res.redirect(".");
    }))
        .patch(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { newCoursename, oldCoursename } = req.body;
        yield DB.updateCourseName(newCoursename, oldCoursename);
        res.status(200);
        res.redirect(".");
    }));
};

const DB = new DatabaseHandler();
const app = express__default['default']();
app.use(session__default['default']({
    secret: "lightbulb",
    cookie: { maxAge: 3600000 },
    saveUninitialized: true,
    resave: true
}));
app.use(bodyParser__default['default'].json());
app.use(bodyParser__default['default'].urlencoded({ extended: true }));
// this is how you'd go about creating new API endpoints and
// sending data back to the client
// more documentation here: http://expressjs.com/en/guide/routing.html#route-handlers
app.route("/users")
    .get(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send(yield DB.getUsers()).end();
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role, FirstName, LastName, Email } = req.body;
    console.log(req.body);
    yield DB.addUser(username, password, roleNameToId(role), FirstName, LastName, Email);
    if (req.session["role"] == "admin") {
        res.redirect(".");
    }
    else {
        res.redirect("/login");
    }
}))
    .delete(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { username } = req.body;
    yield DB.deleteUser(username);
    res.redirect("/index");
}))
    .patch(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body;
    console.log("this is where updateUser method(s) would go");
    console.log("this may help implement it: https://stackoverflow.com/questions/25683760/how-to-dynamically-generate-mysql-update-statement-based-on-defined-variables-fr");
    res.status(200);
    res.redirect(".");
}));
app.get("/admin", auth);
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { psw, uname } = req.body;
    const users = yield DB.getUsers();
    for (const user of users) {
        if (user.password == psw && user.username == uname) {
            switch (user.Roles_idRoles) {
                case 1:
                    req.session["role"] = "admin";
                    res.redirect("/admin");
                    break;
                default:
                    res.redirect("/index");
            }
        }
    }
}));
app.route("/groups")
    .post(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, Description } = req.body;
    yield DB.createDiscussionGroup(Name, Description);
    res.status(200);
    res.redirect(".");
}))
    .delete(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body;
    console.log("this is where the removeDiscussionGroup method would go");
    res.redirect(".");
}))
    .get(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send(yield DB.getGroups()).end();
}))
    .patch(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body;
    console.log("this is where the updateGroupName method would go");
    // await DB.updateGroupName(newGroupName, oldGroupName);
    res.status(200);
    res.redirect(".");
}));
courseRoutes(app, DB);
roleRoutes(app, DB);
// app.route("/discussions")
//   .get(auth, async (req, res) => {
//     return res.send(await DB.getDiscussions()).end();
//   })
//   .post(auth, async (req, res) => {
//     const { title } = req.body;
//     await DB.addDiscussion(title);
//     res.redirect("/admin");
//   })
app.post("/linkUserToSomething", auth, (req, res) => {
    // TODO: implement this lmao
    res.redirect("/admin");
});
// loads the static assets (index.html, login.html, etc) for us
const assets = sirv__default['default']('public', { extensions: ['html', 'htm', ".map"] });
app.use(assets);
app.listen(5000, () => {
    console.log("ready on https://localhost:5000");
});
//# sourceMappingURL=bundle.js.map
