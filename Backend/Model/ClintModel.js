const connection = require("../DB/db");

const LoanFormSubmission = async (LoanData) => {
    const checkSql = "SELECT 1 FROM loan_application_data WHERE mobile_no = ? LIMIT 1";
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
        // check if mobile exists
        const [rows] = await connection.query(checkSql, [LoanData.MobileNo]);
        if (rows.length > 0) {
            console.log("⚠️ Mobile number already exists, skipping insert:", LoanData.MobileNo);
            return { inserted: false, message: "Mobile no already exists" };
        }

        // proceed to insert
        const [result] = await connection.query(insertSql, params);
        console.log("✅ Loan submitted with ID:", result.insertId);
        return { inserted: true, id: result.insertId };
    } catch (err) {
        console.error("❌ Loan submission failed:", err.message);
        throw err;
    }
};

module.exports = { LoanFormSubmission };