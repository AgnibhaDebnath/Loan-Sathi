   const mysql=require("mysql2/promise")

    // Create a connection object
    const connection = mysql.createPool({
        host: process.env.MYSQLHOST, // Or your MySQL server host
        user: process.env.DB_USER, // Your MySQL username
        password: process.env.DATABASE_PASSWORD, // Your MySQL password
        database: process.env.DATABASE, // The database you want to connect to
        port:process.env.DB_PORT
    });
module.exports = connection;