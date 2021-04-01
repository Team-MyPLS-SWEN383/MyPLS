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
     * Method to get list of *all* courses in the database
     * @returns Array of courses in database
     */
    async getCourses(){
        const query = "SELECT * FROM courses";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query);
        connection.release;
        return result;
    }

    /**
     * Method to get list of *all* groups in the database
     * @returns Array of groups that exist in the database
     */
    async getGroups(){
        const query = "SELECT * FROM mypls.groups";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query);
        connection.release();
        return result;
    }

    /**
     * Method to get list of all discussions in the database
     * @returns Array of discussions
     */
    async getDiscussions(){
        const query = "select * from discussions"
        const connection = await this.pool.getConnection();
        const[result] = await connection.query(query);
        connection.release();
        return result;
    }

    /**
     * Method to get all posts within the database
     * @returns Array of posts
     */
    async getPosts(){
        const query = "SELECT * FROM post";
        const connection = await this.pool.getConnection();
        const[result] = await connection.query(query);
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
     * Check if discussion group already exists when creating a group
     * @param name name of discussion group to check
     * @returns length of result array
     */
    async checkDiscussionGroup(name: string){
        const query = "SELECT Name FROM MyPLS.group WHERE name = ?";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[name]) as any;
        connection.release();
        return result.length > 0;
    }

    /**
     * Gets the id of a discussion based on the title
     * @param groupTitle title of discussion topic
     * @returns id of topic 
     */
    async getDiscussionId(groupTitle: string){
        const query = "SELECT idDiscussions FROM discussions WHERE Discussion_Title = ?";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[groupTitle]);
        return result[0]['idDiscussions'];
    }

    /**
     * Creates a discussion within a discussion group
     * @param discussionTitle name of discussion topic 
     * @param summary summary of disucssion topic
     * @param groupName name of group the discussion is associated with
     * @returns true if successful, false if error
     */
    async createDiscussion(discussionTitle: string, summary: string, groupName: string){
        const groupId = await this.getGroupId(groupName);
        const query = "INSERT INTO Discussions (Discussion_Title,Summary,Group_idGroup) VALUES (?,?,?);";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[discussionTitle,summary,groupId]);
        return true;
    }

    /**
     * Create a new discussion group
     * @param name Name of group to be created
     * @param description optional description to be inserted
     * @returns true if successful, false if error occurs
     */
    async createDiscussionGroup(name: string, description: string){
        if(!(await this.checkDiscussionGroup(name))){
            const query = "INSERT INTO MyPLS.Group (Name, Description) VALUES (?,?);";
            const connection = await this.pool.getConnection();
            const[result] = await connection.query(query,[name,description]);
            console.log("Created discussion group!");
            connection.release();
            return true;
        }
        else{
            console.log(`Discussion group ${name} exists`);
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
     * @returns true if user is added, false if error
     */
    async addUserToDiscussion(username: string, group: string) {
        if(this.checkDiscussionGroup(group)){
            const userId = await this.getUserId(username);
            const groupId = await this.getGroupId(group);
            const query = "INSERT INTO MemberList (Group_idGroup, User_idUser) VALUES (?,?)";
            const connection = await this.pool.getConnection();
            const [result] = await connection.query(query,[userId,groupId]);
            connection.release();
            return true;
        }
        else{
            console.log(`Group ${group} doest not exist`);
            return false;
        }
        
    }
    
    /**
     * Remove a user from a discussion group
     * @param username name of user to remove
     * @param group what group to remove user from
     * @returns true if user is sucessfully removed, false if error
     */
    async removeStudentFromDiscussion(username: string, group: string){
        if(this.checkDiscussionGroup(group)){
            const userId = await this.getUserId(username);
            const groupId = await this.getGroupId(group);
            const query = "DELETE FROM MemberList WHERE User_idUser = ? AND Group_idGroup = ?";
            const connection = await this.pool.getConnection();
            const [result] = await connection.query(query,[userId,groupId]);
            connection.release();
            return true;
        }
        else{
            console.log(`Group ${group} does not exist`);
            return false;
        }
        
    }    

    /**
     * Creates a disucssion post under a discussion group given the proper parameters
     * @param title title of post 
     * @param content content of post
     * @param discussionTitle title of discussion this post falls under
     * @param username name of user creating post
     * @returns true if successful, false if not
     */
    async createDiscussionPost(title: string, content: string, discussionTitle: string, username: string){
        const discussionId = await this.getDiscussionId(discussionTitle);
        const userId = await this.getUserId(username);
        const query = "INSERT INTO Post (Title, Content, Discussions_idDiscussions, User_idUser) VALUES (?, ?, ?, ?)";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[title,content,discussionId,userId]);
        connection.release();
        return true;
    }

    /**
     * Gets discussion posts in a discussion group given the discussion title
     * @param discussionTitle title of discussion to pull up posts for
     * @returns result array containing post title,content, and username of posts 
     */
    async getDiscussionPosts(discussionTitle: string){
        const query = "SELECT P.title, P.content, U.username FROM Post P INNER JOIN user U ON P.User_idUser = U.idUser WHERE discussions_idDiscussions = ?";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[discussionTitle]);
        connection.release();
        return result;
    }

    /**
     * Rate a specified user with a number and any additional comments
     * @param userRated name of user to be rated
     * @param rating number specifying rating
     * @param comment any additional comments a user has to make on that person
     * @returns true if successful, false if error
     */
    async rateUser(userRated: string, rating: number, comment: string){
        const userId = await this.getUserId(userRated);
        const query = "INSERT INTO Ratings (User_idUser, ratingNumber, Comment) VALUES (?, ?, ?)";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[userId,rating,comment]);
        connection.release();
        return true;
    }

    /**
     * Gets the ratings of a user based on the username provided
     * @param username name of user to fetch ratings for
     * @returns array containing score and comments of specified user
     */
    async getRatings(username: string){
        const query = "SELECT R.ratingNumber, R.Comment FROM ratings R INNER JOIN user U ON R.User_idUser = U.idUser WHERE U.username = ?";
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(query,[username]);
        connection.release();
        return result;
    }
}

