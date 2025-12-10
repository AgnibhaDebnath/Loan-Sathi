
const connection=require("../DB/db")
const LoanDetails = async () => {
    const sql = "SELECT * FROM loan_application_data" 
    try {
        const [rows] = await connection.execute(sql);
        return rows;

    } catch (error) {
        console.log(error.message)
        throw error;
}
    
    
}
const Update_statsu_of_borrower_on_database = async (number, status) => {
    try {
        const sql = "UPDATE loan_application_data SET loan_status = ?, decision_at=CURRENT_TIMESTAMP WHERE mobile_no=?"
    
        const [rows] = await connection.execute(sql, [status, number])
        if (rows.affectedRows > 0) {
            return { "success": true, "message": "Loan status update successfull" };
        }
    }
    catch (err) {
        console.log(err)
    }
}
const verify_password = async (trimedName) => {
    try {
        const [rows] = await connection.execute("SELECT * FROM admin_details WHERE admin_name = ? ", [trimedName]) 
        if (rows.length == 0) {
            return null
        } else {
        const [{ admin_password }] = rows;
       
        return admin_password  
        }


    } catch(err) {
        console.log(err)
    }
   

   
}
 
    

    

module.exports = { LoanDetails,Update_statsu_of_borrower_on_database,verify_password }