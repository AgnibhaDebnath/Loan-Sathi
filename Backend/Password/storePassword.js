const bcrypt = require("bcrypt")
const connection=require("../DB/db")
async function run() {
  const plainPassword = "agnibha@2005"
const hashedPassword = await bcrypt.hash(plainPassword, 10)
console.log(hashedPassword)

const adminDatails = {
    "admin_name": "Agnibha Debnath",
    "admin_phone_no": "8695276026",
    "admin_password":hashedPassword
}

    connection.query("INSERT INTO admin_details (admin_name,admin_phone_no,admin_password) VALUES (?,?,?)", [adminDatails.admin_name, adminDatails.admin_phone_no, adminDatails.admin_password], (err,result) => {
        if (err) throw err
        console.log("Admin Details stored successfully")
        connection.end()
})

  
}
run();
