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
     * @param username
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
     * Checks if a username already exists in the database. If so, return an error. Otherwise, create the new user
     * @param username the username to get
     */
    async checkNewUser(username: string) {
        const query = "SELECT username FROM user WHERE username = ?";
        // const query = "SELECT * FROM user";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query, [username]) as any[];
        connection.release();
        return result.length > 0;
    }

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
     * @param username 
     * @param password 
     * @param roleId 
     */
    async addUser(username: string, password: string, roleId: number) {
        if (!(await this.checkNewUser(username))) {
            const query = "INSERT INTO user (username, password, Roles_idRoles) VALUES(?, ?, ?)";
            const connection = await this.pool.getConnection();
            const [result] = await connection.query(query, [username, password, roleId]);
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
     * @param username 
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

    async addCourse(coursename: string) {
        if (!(await this.checkNewCourse(coursename))) {
            const query = "INSERT INTO courses (coursename) VALUES(?)";
            const connection = await this.pool.getConnection();
            const [result] = await connection.query(query, [coursename]);
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
     * @param coursename 
     * @param instructor
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
     * Adds professor to existing course
     * @param coursename 
     * @param instructor
     */

    async updateCourse(coursename: string, instructor: string) {
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
     * @param keywords 
     */

    async searchDiscussion(keywords: string) {
        const query = "SELECT * FROM discussions WHERE discussiontitle LIKE '?'";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query, [keywords]) as any[];
        connection.release();
        return result.length > 0;
    }

}

