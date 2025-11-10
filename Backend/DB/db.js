   const mysql=require("mysql2/promise")

    // Create a connection object
    const connection = mysql.createPool({
        host: 'localhost', // Or your MySQL server host
        user: 'root', // Your MySQL username
        password: 'Tunai@2005', // Your MySQL password
        database: 'loan_management_system', // The database you want to connect to
        port:3306
    });
module.exports = connection;