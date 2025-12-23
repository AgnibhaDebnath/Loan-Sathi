   const mysql=require("mysql2/promise")

    // Create a connection object
    const connection = mysql.createPool({
        host: 'localhost', // Or your MySQL server host
        user: 'root', // Your MySQL username
        password: process.env.DATABASE_PASSWORD, // Your MySQL password
        database: process.env.DATABASE, // The database you want to connect to
        port:process.env.PORT
    });
module.exports = connection;