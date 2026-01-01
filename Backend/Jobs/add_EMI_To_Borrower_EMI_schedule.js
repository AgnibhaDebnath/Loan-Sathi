const connection=require("../DB/db")

const add_first_emi_in_Borrower_EMI_Schedule = async (emiResults) => {
    try {
        for (const emi of emiResults) {
            const [rows] = await connection.execute("INSERT INTO emi_schedule_for_borrower (loan_id,installment_no,due_date,emi_amount ) VALUES(?,?,?,?)", [emi.loanID, emi.installmentNo, new Date().toLocaleDateString("en-CA"), emi.emiAmount])
            if (rows.affectedRows == 0) {
                return false
            }
        }
        return true
    } catch (err) {
        console.log(err)
        return false
        }


}
module.exports={add_first_emi_in_Borrower_EMI_Schedule}