/**
 * NEW THINGS IN THIS FILE
 * Arrow Functions: "(parameters) => {code}"
 * - these act just like function() {} except it doesn't create a new scope. 
 *   This means we can use this.whatever to reference class properties
 * Type annotations: "let thing: number = 4"
 * - these are what give typescript its name. The ": number" tells the editor that thing is a number, and when we do "thing." in the editor
 *   we'll get a list of autocompletion options that apply to the "number" type.
 *   Many are implicit (such as when assigning something immediately) but if you plan to assign it something later it should be annotated if possible.
 *   Technically, you can use "any" as the type to circumvent these features, but most of the time things should be annotated with types when it makes
 *   sense to do so.
 * promise-based functions: async/await
 * - these allow the program to wait at a point for some asynchronous code to execute before continuing, allowing things like
 *   sql queries to complete before moving on.
 * */
import * as mysql from "mysql2/promise"; // allows us to use async/await with mysql calls

export default class DatabaseHandler {
    private pool: mysql.Pool;
    constructor() {
        this.pool = mysql.createPool({
            connectionLimit: 25,
            host: 'localhost',
            user: 'mypls',
            password: 'mypls123', // 'YOUR_PASSWORD_HERE',
            database: 'mypls'
        });
    }

    /**
     * logs the role of the specified username to the console
     * @param username name of user to get role of 
     */
    async displayRole(username: string) {
        const query = "SELECT role_name FROM roles WHERE idRoles IN (SELECT Roles_idRoles FROM user WHERE username = ?)";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query, [username]);
        const data = JSON.stringify(result);
        console.log(result[0]['role_name']);
        connection.release();
    }

    /**
     * Gets the ID of a user to be used in other functions
     * @param username Name of user to fetch ID
     * @returns ID of User
     */
    async getUserId(username: string){
        const query = "SELECT idUser FROM user WHERE username = ?";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[username]);
        connection.release();
        return result[0]["idUser"];
    }

    /**
     * Gets the id of a group to be used in other functions
     * @param title name of group to get id for
     * @returns id of gorup
     */
    async getGroupId(title: string){
        const query = "SELECT idGroup From mypls.group WHERE Name = ?";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[title]);
        connection.release();
        return result[0]['idGroup'];
    }

    /**
     * Checks if a username already exists in the database. If so, return an error. Otherwise, create the new user
     * @param username the username to get
     */
    async checkNewUser(username: string) {
        const query = "SELECT username FROM user WHERE username = ?";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query, [username]) as any[];
        connection.release();
        return result.length > 0;
    }

    /**
     * Method to get list of users in the database
     * @returns list of users in the database
     */
    async getUsers() {
        const query = "SELECT * FROM user";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query);
        connection.release();
        return result;
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
    async addUser(username: string, password: string, roleId: number, firstName: string, lastName: string, email: string) {
        if (!(await this.checkNewUser(username))) {
            const query = "INSERT INTO user (username, password, Roles_idRoles,FirstName,LastName,Email) VALUES(?, ?, ?,?,?,?)";
            const connection = await this.pool.getConnection();
            const [result] = await connection.query(query, [username, password, roleId,firstName,lastName,email]);
            console.log(`inserted new user: ${username}`);
            connection.release();
            return true;
        } else {
            console.log("user already exists!");
            return false;
        }
    }

    /**
     * Deletes a user from the users table given their username
     * @param username name of user to delete
     */
    async deleteUser(username: string) {
        if (await this.checkNewUser(username)) {
            const query = "DELETE FROM user WHERE username = ?";
            const connection = await this.pool.getConnection();
            await connection.query(query, [username]);
            console.log(`deleted user: ${username}`)
            connection.release();
            return true;
        } else {
            console.log(`user ${username} doesn't exist!`);
            return false;
        }
    }

    /**
     * Check if course already exists in database
     * @param coursename name of course to check database for
     * @returns the results of the check
     */
    async checkNewCourse(coursename: string) {
        const query = "SELECT coursename FROM courses WHERE coursename = ?";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query, [coursename]) as any[];
        connection.release();
        return result.length > 0;
    }

    /**
     * Adds a course from the courses table given coursename
     * @param coursename 
     */

    async addCourse(coursename: string,courseCode: string) {
        if (!(await this.checkNewCourse(coursename))) {
            const query = "INSERT INTO courses (coursename,courseCode) VALUES(?,?)";
            const connection = await this.pool.getConnection();
            const [result] = await connection.query(query, [coursename,courseCode]);
            console.log(`inserted new course: ${coursename}`);
            connection.release();
            return true;
        } else {
            console.log("Course already exists!");
            return false;
        }
    }

    /**
     * Deletes a course from the courses table given coursename
     * @param coursename name of course to delete
     * @returns true if successful, false if an error occurs
     */

    async deleteCourse(coursename: string) {
        if (await this.checkNewCourse(coursename)) {
            const query = "DELETE FROM courses WHERE coursename = ?";
            const connection = await this.pool.getConnection();
            await connection.query(query, [coursename]);
            console.log(`Deleted course: ${coursename}`)
            connection.release();
            return true;
        } else {
            console.log(`Course ${coursename} doesn't exist!`);
            return false;
        }
    }

    /**
     * Update course name 
     * @param coursename course to be modified
     * @param newCourseName name to replace with
     * @returns true if changed, false if error
     */
    async updateCourseName(coursename: string, newCourseName: string) {
        if (await this.checkNewCourse(coursename)) {
            const query = "UPDATE courses SET coursename = ? WHERE coursename = ?";
            const connection = await this.pool.getConnection();
            const [result] = await connection.query(query, [newCourseName, coursename]);
            console.log(`Updated course: ${coursename}`);
            connection.release();
            return true;
        } else {
            console.log(`Course ${coursename} doesn't exist!`);
            return false;
        }
    }

    /**
     * Update the instructor for a course
     * @param coursename name to modify course instructor
     * @param instructor name of instructor 
     * @returns true if successful, false if an error occurs
     * 
     * NEED TO REWORK so it gets instructor ID then assign it to course
     */
    async updateCourseInstructor(coursename: string, instructor: string) {
        if (await this.checkNewCourse(coursename)) {
            const query = "UPDATE courses SET instructor = ? WHERE coursename = ?";
            const connection = await this.pool.getConnection();
            const [result] = await connection.query(query, [instructor, coursename]);
            console.log(`Updated course: ${coursename}`);
            connection.release();
            return true;
        } else {
            console.log(`Course ${coursename} doesn't exist!`);
            return false;
        }
    }

    /**
     * Searches for discussion given parameter
     * @param keywords keyword to query database with
     * @returns list of results from the db
     */
    async searchDiscussion(keywords: string) {
        const query = "SELECT * FROM discussions WHERE Discussion_Title LIKE '?'";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query, [keywords]) as any[];
        connection.release();
        return result.length > 0;
    }

    /**
     * Add a user of any kind to a group
     * @param username name of user to add to group
     * @param group name of group to add user to
     * @returns true if user is added
     */
    async addUserToDiscussion(username: string, group: string) {
        const userId = await this.getUserId(username);
        const groupId = await this.getGroupId(group);
        const query = "INSERT INTO MemberList (Group_idGroup, User_idUser) VALUES (?,?)";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[userId,groupId]);
        connection.release();
        return true;
    }
    
    /**
     * Remove a user from a discussion group
     * @param username name of user to remove
     * @param group what group to remove user from
     * @returns true if user is sucessfully removed
     */
    async removeStudentFromDiscussion(username: string, group: string){
        const userId = await this.getUserId(username);
        const groupId = await this.getGroupId(group);
        const query = "DELETE FROM MemberList WHERE User_idUser = ? AND Group_idGroup = ?";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[userId,groupId]);
        connection.release();
        return true;
    }    
}

