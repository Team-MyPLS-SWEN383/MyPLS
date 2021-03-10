'use strict';

var sirv = require('sirv');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2/promise');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var sirv__default = /*#__PURE__*/_interopDefaultLegacy(sirv);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var bodyParser__default = /*#__PURE__*/_interopDefaultLegacy(bodyParser);

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
            user: 'root',
            password: 'pwrit2020',
            database: 'mypls'
        });
    }
    /**
     * logs the role of the specified username to the console
     * @param username
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
     * Checks if a username already exists in the database. If so, return an error. Otherwise, create the new user
     * @param username the username to get
     */
    checkNewUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT username FROM user WHERE username = ?";
            // const query = "SELECT * FROM user";
            const connection = yield this.pool.getConnection();
            const [result] = yield connection.query(query, [username]);
            connection.release();
            return result.length > 0;
        });
    }
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
     * Inserts a new user into the user table with their provided information
     * called after checking if they already exist
     * @param username
     * @param password
     * @param roleId
     */
    addUser(username, password, roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.checkNewUser(username))) {
                const query = "INSERT INTO user (username, password, Roles_idRoles) VALUES(?, ?, ?)";
                const connection = yield this.pool.getConnection();
                yield connection.query(query, [username, password, roleId]);
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
     * @param username
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

const DB = new DatabaseHandler();
const app = express__default['default']();
// loads the static assets (index.html, login.html, etc) for us
const assets = sirv__default['default']('public');
app.use(assets);
app.use(bodyParser__default['default'].json());
app.use(bodyParser__default['default'].urlencoded({ extended: true }));
// this is how you'd go about creating new API endpoints and
// sending data back to the client
// more documentation here: http://expressjs.com/en/guide/routing.html#route-handlers
app.get("/users/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send(yield DB.getUsers()).end();
}));
// we can use things like .get, .post, and .delete to make things RESTful and semantic
app.post("/users/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, psw, role } = req.body;
    yield DB.addUser(username, psw, roleNameToId(role));
    res.redirect("/login");
}));
// so we can do different things when using different methods to ping the same route
app.delete("/users/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { username } = req.body;
    yield DB.deleteUser(username);
    res.redirect("/index");
}));
app.listen(5000, () => {
    console.log("ready on https://localhost:5000");
});
//# sourceMappingURL=bundle.js.map
