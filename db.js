const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 25,
    host:'localhost',
    user:'root',
    password: 'YOUR_PASSWORD_HERE',
    database: "mypls"
});

function displayRole(username){
    let sql = "SELECT role_name FROM roles WHERE idRoles IN (SELECT Roles_idRoles FROM user WHERE username = ?)";    
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(sql,[username],function(err,result){
            let data = JSON.stringify(result);
            console.log(result[0]['role_name']);
            connection.release();
            if(err) throw err;
        })
    })
}

function checkNewUser(username){
    // Check if username already exists in database. If so, return an error
    // Else, create new user
    let sql = "SELECT username FROM user WHERE username= ?";
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(sql,[username],function(err,result){
            if(result.length > 0){
                connection.release();
                if(err) throw err;
                return true;
                
            }
            else{
                connection.release();
                if(err) throw err;
                return false;
            }
            
        })
    })
    
}

function addUser(username, password, roleId){
    // Insert new user into user table with their provided information
    // this is called after checking if they exist already
    let sql = "INSERT INTO user (username,password,Roles_idRoles) VALUES(?,?,?)";
    let check = checkNewUser(username);
    console.log(check);
    if(check = false){
        pool.getConnection(function(err,connection){
            connection.query(sql,[username,password,roleId],function(err,result){
                if (err) throw err;
                console.log("inserted new user");
                connection.release();
        });
    })}
    else{
        console.log("user already exists");
    }
}

module.exports = {
    displayRole,
    checkNewUser,
    addUser
}

