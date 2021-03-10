'use strict';

var mysql = require('mysql2/promise');

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
                console.log("inserted new user");
                connection.release();
            }
            else {
                console.log("user already exists!");
            }
        });
    }
}

const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const DBConn = new DatabaseHandler();
    yield DBConn.displayRole('stu123');
    console.log(yield DBConn.checkNewUser('a'));
});
main();
//# sourceMappingURL=bundle.js.map
