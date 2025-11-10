const connection=require("../DB/db")
const LoanDetails = async () => {
    const sql = "SELECT * FROM loan_application_data" 
    try {
        const [rows] = await connection.query(sql);
        return rows;

    } catch (error) {
        console.log(error.message)
        throw error;
}
    
    
}
module.exports = { LoanDetails };