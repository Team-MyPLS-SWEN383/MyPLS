const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 25,
    host:'localhost',
    user:'root',
    password: 'AyyLmao12',
    database: "mypls"
});

function endPool(){
    pool.end(function(err){
        if(err) throw err;
        console.log("Disconencted");
    });
}

function displayRole(username){
    let sql = "SELECT role_name FROM roles WHERE idRoles IN (SELECT Roles_idRoles FROM user WHERE username = '"+username+"')";
    pool.query(sql,function(err,result){
        if(err) throw err;
        console.log(result);
        pool.end()
    });
}

displayRole("stu123");

module.exports = {
    displayRole
}