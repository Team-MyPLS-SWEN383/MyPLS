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
            const data = JSON.stringify(result);
            console.log(result[0]['role_name']);
            connection.release();
            return data;
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
            connection.release();
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
     * Update an existing user's first name
     * @param username name of user to be modified
     * @param firstName new first name for user
     * @returns true on success, false if user does not exist
     */
    updateUserFirstName(username, firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkNewUser(username)) {
                const query = "UPDATE user SET FirstName = ? WHERE username = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [username, firstName]);
                console.log(`Updated first name for: ${username}`);
                connection.release();
                return true;
            }
            console.log(`user: ${username} does not exist`);
            return false;
        });
    }
    /**
     * Update an existing user's last name
     * @param username name of user to be modified
     * @param lastName new last name for user
     * @returns true on success, false if user does not exist
     */
    updateUserLastName(username, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkNewUser(username)) {
                const query = "UPDATE user SET LastName = ? WHERE username = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [username, lastName]);
                console.log(`Updated last name for: ${username}`);
                connection.release();
                return true;
            }
            console.log(`user: ${username} does not exist`);
            return false;
        });
    }
    /**
     * Update an existing user's email
     * @param username name of user to be modified
     * @param email new email for user
     * @returns true on success, false if user does not exist
     */
    updateUserEmail(username, email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkNewUser(username)) {
                const query = "UPDATE user SET Email = ? WHERE username = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [username, email]);
                console.log(`Updated email for: ${username}`);
                connection.release();
                return true;
            }
            console.log(`user: ${username} does not exist`);
            return false;
        });
    }
    /**
     * Update an existing user's password
     * @param username name of user to be modified
     * @param password new password for user
     * @returns true on success, false if user does not exist
     */
    updateUserPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkNewUser(username)) {
                const query = "UPDATE user SET password = ? WHERE username = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [username, password]);
                console.log(`Updated password for: ${username}`);
                connection.release();
                return true;
            }
            console.log(`user: ${username} does not exist`);
            return false;
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
     * Check if course code already exists in database
     * @param courseCode Code of course to check database for
     * @returns the results of the check
     */
    checkNewCourse(courseCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT courseCode FROM courses WHERE courseCode = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [courseCode]);
            connection.release();
            return result.length > 0;
        });
    }
    /**
     * Checks if course name exists in the database
     * @param coursename name of course to search for
     * @returns results of the check
     */
    checkCourseName(coursename) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT coursename FROM courses WHERE coursename = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [coursename]);
            connection.release();
            return result.legth > 0;
        });
    }
    /**
     * Adds a course from the courses table given coursename
     * @param coursename
     * @param courseCode
     * @param username
     * @returns true if successful, false if course already exists
     */
    // FIXME: handle "User_idUser" field
    addCourse(coursename, courseCode, username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.checkNewCourse(courseCode))) {
                const userId = yield this.getUserId(username);
                const query = "INSERT INTO courses (coursename,courseCode,User_idUser) VALUES(?,?,?)";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [coursename, courseCode, userId]);
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
    getCourseId(coursename) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT idCourse from courses WHERE coursename = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [coursename]);
            connection.release();
            return result[0]["idCourse"];
        });
    }
    /**
     * Deletes a course from the courses table given coursename
     * @param coursename name of course to delete
     * @returns true if successful, false if an error occurs
     */
    deleteCourse(courseCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkNewCourse(courseCode)) {
                const query = "DELETE FROM courses WHERE courseCode = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [courseCode]);
                console.log(`Deleted course: ${courseCode}`);
                connection.release();
                return true;
            }
            else {
                console.log(`Course ${courseCode} doesn't exist!`);
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
            if (yield this.checkCourseName(coursename)) {
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
     * @param coursename code to modify course instructor
     * @param instructor name of instructor
     * @returns true if successful, false if an error occurs
     *
     * NEED TO REWORK so it gets instructor ID then assign it to course
     */
    updateCourseInstructor(courseCode, instructor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkNewCourse(courseCode)) {
                const instructorId = yield this.getUserId(instructor);
                const query = "UPDATE courses SET User_idUser = ? WHERE courseCode = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [instructorId, courseCode]);
                console.log(`Updated course: ${courseCode}`);
                connection.release();
                return true;
            }
            else {
                console.log(`Course ${courseCode} doesn't exist!`);
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
            connection.release();
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
            connection.release();
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
     * Deletes a discussion group based on given name
     * @param name name of group to be deleted
     * @returns true if successful, false if group does not exist
     */
    deleteGroup(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkDiscussionGroup(name)) {
                const query = "DELETE FROM mypls.group WHERE name = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [name]);
                connection.release();
                return true;
            }
            else {
                console.log(`Group ${name} does not exist`);
                return false;
            }
        });
    }
    /**
     * Updates an existing group name
     * @param currentName name of group to be modified
     * @param newName new name to replace it
     * @returns true if successful, false if current name does not exist or new name is already taken
     */
    updateGroupName(currentName, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.checkDiscussionGroup(currentName)) && !(yield this.checkDiscussionGroup(newName))) {
                const query = "UPDATE mypls.group SET Name = ? WHERE Name = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [newName, currentName]);
                connection.release();
                return true;
            }
            else {
                console.log(`Group ${newName} already exists in database`);
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
    /**
     * Lecture Statements
     */
    getLectures() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM Lecture";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query);
            connection.release();
            return result;
        });
    }
    getLectureId(lecturename) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT idLecture from lecture WHERE title = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [lecturename]);
            connection.release();
            return result[0]["idLecture"];
        });
    }
    checkLecture(lectureTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT title FROM Lecture WHERE title=?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [lectureTitle]);
            connection.release();
            return result.length > 0;
        });
    }
    checkCourse(courseCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT coursename FROM courses WHERE courseCode = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [courseCode]);
            return result;
        });
    }
    createLecture(lectureTitle, summary, unlockDate, courseID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLecture(lectureTitle)) {
                const query = "INSERT INTO Lecture (title, summary, UnlockDate, Courses_idCourse) VALUES (?, ?, ?, ?)";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [lectureTitle, summary, unlockDate, courseID]);
                connection.release();
                return true;
            }
            else {
                console.log(`Lecture ${lectureTitle} exists`);
                return false;
            }
        });
    }
    updateLecture(lectureTitle, summary, unlockDate, courseID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLecture(lectureTitle)) {
                const query = "UPDATE Lecture SET (summary = ?, UnlockDate = ?, Courses_idCourse = ?) WHERE title = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [summary, unlockDate, courseID, lectureTitle]);
                connection.release();
                return true;
            }
            else {
                console.log(`Lecture ${lectureTitle} does not exist`);
                return false;
            }
        });
    }
    deleteLecture(lectureTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLecture(lectureTitle)) {
                const query = "DELETE FROM Lecture title = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [lectureTitle]);
                connection.release();
                return true;
            }
            else {
                console.log(`Lecture ${lectureTitle} does not exist`);
                return false;
            }
        });
    }
    /**
     * Gets all lectures from a specific course
     * @param courseCode course code to get lectures form
     * @returns  list of lectures present in course
     */
    getCourseLectures(courseCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkCourse(courseCode)) {
                const query = "SELECT * FROM lecture L INNER JOIN Courses C ON L.Courses_idCourse = C.idCourse WHERE C.courseCode = ?";
                const connection = yield this.pool.getConnection();
                const [result] = yield connection.query(query, [courseCode]);
                connection.release();
                return result;
            }
            else {
                console.log(`Course ${courseCode} does not exist`);
                return false;
            }
        });
    }
    /**
     * Gets the content of a specific lecture
     * @param lectureTitle title of lecture to get content for
     * @returns content of lecture
     */
    getLectureContent(lectureTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLecture(lectureTitle)) {
                const query = "SELECT C.ContentLink FROM Content C INNER JOIN Lecture L ON L.idLecture = C.Lecture_idLecture;";
                const connection = yield this.pool.getConnection();
                const [result] = yield connection.query(query, [lectureTitle]);
                connection.release();
                return result;
            }
            else {
                console.log(`Error getting content: ${lectureTitle} does not exist`);
                return false;
            }
        });
    }
    /**
     * Quiz Statements
     */
    getQuizzes() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM Quiz";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query);
            connection.release();
            return result;
        });
    }
    checkQuizzes(quizTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT Title FROM Quiz WHERE Title=?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [quizTitle]);
            connection.release();
            return result.length > 0;
        });
    }
    createQuiz(quizTitle, startTime, endTime, lectureID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkQuizzes(quizTitle)) {
                const query = "INSERT INTO Quiz (Title, StartTime, EndTime, Lecture_idLecture) VALUES (?, ?, ?, ?)";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [quizTitle, startTime, endTime, lectureID]);
                connection.release();
                return true;
            }
            else {
                console.log(`Quiz ${quizTitle} exists`);
                return false;
            }
        });
    }
    updateQuiz(quizTitle, startTime, endTime) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLecture(quizTitle)) {
                const query = "UPDATE Quiz SET (summary = ?, StartTime = ?, EndTime = ?) WHERE Title = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [startTime, endTime, quizTitle]);
                connection.release();
                return true;
            }
            else {
                console.log(`Quiz ${quizTitle} does not exist`);
                return false;
            }
        });
    }
    deleteQuiz(quizTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLecture(quizTitle)) {
                const query = "DELETE FROM Quiz Title = ?";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [quizTitle]);
                connection.release();
                return true;
            }
            else {
                console.log(`Quiz ${quizTitle} does not exist`);
                return false;
            }
        });
    }
    /**
     * Student - See professor ratings
     * @param instructor
     */
    getInstructorID(instructor) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM User WHERE Roles_idRoles = 2 AND FirstName = ? OR LastName = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [instructor, instructor]);
            connection.release();
            return result;
        });
    }
    getRating(instructor) {
        return __awaiter(this, void 0, void 0, function* () {
            var profID = this.getInstructorID(instructor);
            const query = "SELECT * FROM Ratings WHERE User_idUser = ?";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [profID]);
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
const profAuth = (req, res, next) => {
    if (req.session["role"] == "admin")
        return next();
    else if (req.session["role"] == "instructor")
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
        .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.send(yield DB.getCourses()).end();
    }))
        .post(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { coursename, courseCode, username } = req.body;
        yield DB.addCourse(coursename, courseCode, username);
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

const toMySqlDate = (date) => {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
};

const lectureRoutes = (app, DB) => {
    app.route("/lectures")
        .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.send(yield DB.getLectures()).end();
    }))
        .post(profAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, summary, UnlockDate, coursename } = req.body;
        yield DB.createLecture(title, summary, toMySqlDate(UnlockDate), yield DB.getCourseId(coursename));
        res.status(200);
        res.redirect("/instructor");
    }))
        .delete(profAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title } = req.body;
        yield DB.deleteLecture(title);
        res.redirect(".");
    }))
        .patch(profAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, summary, UnlockDate, coursename } = req.body;
        yield DB.updateLecture(title, summary, toMySqlDate(UnlockDate), yield DB.getCourseId(coursename));
        res.status(200);
        res.redirect(".");
    }));
};

const contentRoutes = (app, DB) => {
    app.route("/content")
        .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("lecture content GET call");
        return res.redirect(".");
        // return res.send(await DB.getLecture()).end();
    }))
        .post(profAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        req.body;
        console.log("lecture content POST call");
        // await DB.createLecture(ContentLink, Lecture_idLecture);
        res.status(200);
        res.redirect(".");
    }))
        .delete(profAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        req.body;
        console.log("lecture content DELETE call");
        // await DB.deleteLecture(title);
        res.redirect(".");
    }))
        .patch(profAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        req.body;
        console.log("lecture content PATCH call");
        // await DB.updateLecture(ContentLink, Lecture_idLecture);
        res.status(200);
        res.redirect(".");
    }));
};

const quizRoutes = (app, DB) => {
    app.route("/quizzes")
        .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.send(yield DB.getQuizzes()).end();
    }))
        .post(profAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { Title, StartTime, EndTime, title } = req.body;
        yield DB.createQuiz(Title, toMySqlDate(StartTime), toMySqlDate(EndTime), yield DB.getLectureId(title));
        res.status(200);
        res.redirect(".");
    }))
        .delete(profAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { Title } = req.body;
        yield DB.deleteQuiz(Title);
        res.redirect(".");
    }))
        .patch(profAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { Title, StartTime, EndTime } = req.body;
        yield DB.updateQuiz(Title, toMySqlDate(StartTime), toMySqlDate(EndTime));
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
    const { oldUsername, username, FirstName, LastName, Roles_idRoles, Email } = req.body;
    // console.log("this is where updateUser method(s) would go");
    // console.log("this may help implement it: https://stackoverflow.com/questions/25683760/how-to-dynamically-generate-mysql-update-statement-based-on-defined-variables-fr");
    if (FirstName === null || FirstName === void 0 ? void 0 : FirstName.length)
        yield DB.updateUserFirstName(oldUsername, FirstName);
    if (LastName === null || LastName === void 0 ? void 0 : LastName.length)
        yield DB.updateUserLastName(oldUsername, LastName);
    if (Email === null || Email === void 0 ? void 0 : Email.length)
        yield DB.updateUserEmail(oldUsername, Email);
    res.status(200);
    res.redirect(".");
}));
app.get("/admin", auth);
app.get("/instructor", profAuth);
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { psw, uname } = req.body;
    const users = yield DB.getUsers();
    for (const user of users) {
        if (user.password == psw && user.username == uname) {
            switch (user.Roles_idRoles) {
                case 1:
                    req.session["role"] = "admin";
                    res.redirect("/admin");
                    return;
                case 2:
                    req.session["role"] = "instructor";
                    res.redirect("/instructor");
                    return;
                default:
                    res.redirect("/index");
            }
        }
    }
    res.redirect("/login");
}));
app.route("/groups")
    .post(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, Description } = req.body;
    yield DB.createDiscussionGroup(Name, Description);
    res.status(200);
    res.redirect(".");
}))
    .delete(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name } = req.body;
    yield DB.deleteGroup(Name);
    res.redirect(".");
}))
    .get(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send(yield DB.getGroups()).end();
}))
    .patch(auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newGroupName, oldGroupName } = req.body;
    yield DB.updateGroupName(newGroupName, oldGroupName);
    res.status(200);
    res.redirect(".");
}));
courseRoutes(app, DB);
roleRoutes(app, DB);
lectureRoutes(app, DB);
contentRoutes(app);
quizRoutes(app, DB);
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
