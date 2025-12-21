const connection = require("../DB/db");

const LoanFormSubmission = async (LoanData) => {
    
    const insertSql =
        "INSERT INTO loan_application_data (first_name,last_name,mobile_no,loan_type,loan_amount) VALUES(?,?,?,?,?)";

    const params = [
        LoanData.Borrower[0],
        LoanData.Borrower[1],
        LoanData.MobileNo,
        LoanData.LoanType,
        LoanData.LoanAmount,
    ];

    try {
        const [result] = await connection.query(insertSql, params);
        console.log("✅ Loan submitted with ID:", result.insertId);
        return { inserted: true, id: result.insertId };
    } catch (err) {
        console.error("❌ Loan submission failed:", err.message);
        throw err;
    }
};
const findBorrowerByPhone = async (MobileNo) => {
    try {
        
        const [rows] = await connection.query("SELECT 1 FROM loan_application_data WHERE mobile_no = ? LIMIT 1", [MobileNo]);
    if (rows.length > 0) {
        return true
    }
    else {
        return false
        }
    } catch (err) {
        console.log("error")
        throw err;
        
    }
    
}
const loanDataForAuthUser = async (decoded) => {

    try {
     const phone = decoded.phone_number?.replace("+91", "");

        if (!phone) {
            throw new Error("Phone number not found in token");
        } 
        const [rows] = await connection.query("SELECT * FROM loan_application_data WHERE mobile_no = ? ", [phone]);
        console.log(rows)
        return rows
    } catch (err) {
        console.log("error")
        throw err;
        
    }
}

module.exports = { LoanFormSubmission,findBorrowerByPhone,loanDataForAuthUser };