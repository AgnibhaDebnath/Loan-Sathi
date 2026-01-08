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
        console.log(err)
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
       
        return rows
    } catch (err) {
        console.log("error")
        throw err;
        
    }
}
const verifyBorrower = async (uid, phoneNo) => {
    try {
        const [uidRows] = await connection.execute("SELECT mobile_no,firebase_uid FROM loan_application_data WHERE firebase_uid=? ", [uid])
        if (uidRows.length > 0) {
            const borrower = uidRows[0]
            if (borrower.mobile_no !== phoneNo) {
                return { status: "conflict" };
            }
            return { status: "exist" }
        }
        console.log(phoneNo)
        const [phoneRows] = await connection.execute("SELECT borrower_id,firebase_uid FROM loan_application_data WHERE mobile_no = ?", [phoneNo]);
        const borrower = phoneRows[0];


        if (!borrower.firebase_uid) {
            await connection.execute("UPDATE loan_application_data SET firebase_uid = ?, role = ? WHERE mobile_no = ?", [uid, "borrower", phoneNo])
            return { status: "updated" };
        }
    } catch (err) {
        console.error("Error verifying borrower:", err);
        throw err;
    }

}
const get_loan_details = async (uid) => {
    try {
 
        const [rows] = await connection.execute("SELECT b.borrower_name,b.image_url,l.original_principal,l.interest_rate,l.loan_tenure,l.loan_id,l.starting_date,l.total_outstanding,l.status FROM loan_details l JOIN borrower_details b ON l.borrower_id = b.borrower_id WHERE b.firebase_uid=?", [uid])
       
        if (rows.length > 0) {
           return rows 
        }
       return null
    } catch (err) {
        console.log(err)
         }
    
}
const get_emi_details = async (loanID, skip, emi_per_page) => {
    
    try {
    
        const [rows] = await connection.execute(`SELECT installment_no,due_date,emi_amount,amount_paid,penalty FROM emi_schedule_for_borrower WHERE loan_id =? ORDER BY installment_no DESC LIMIT ? OFFSET ?`, [loanID, emi_per_page, skip])
        
         const [countPaidorUnpaidEMI] = await connection.execute(`SELECT l.loan_id, l.loan_tenure AS total_emi,SUM(CASE WHEN e.amount_paid >= e.emi_amount THEN 1 ELSE 0 END) AS paid_emi, SUM(CASE WHEN e.amount_paid < e.emi_amount THEN 1 ELSE 0 END) AS unpaid_emi FROM loan_details l JOIN emi_schedule_for_borrower e ON l.loan_id = e.loan_id WHERE l.loan_id = ? GROUP BY l.loan_id, l.loan_tenure`,[loanID])
        
        if (rows.length > 0 && countPaidorUnpaidEMI.length > 0) {
            console.log(countPaidorUnpaidEMI)
            return { rows, countPaidorUnpaidEMI } 
        }
       return []
    } catch (err) {
        console.log(err)
    }
}
module.exports = { LoanFormSubmission,findBorrowerByPhone,loanDataForAuthUser,verifyBorrower,get_loan_details,get_emi_details };