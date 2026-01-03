const connection=require("../DB/db")
const add_next_emi_in_Borrower_EMI_Schedule = async (next_emis) => {
    try {
        
  
    for (const emi of next_emis) {
        const [rows] = await connection.execute("INSERT INTO emi_schedule_for_Borrower (loan_id,installment_no,due_date,emi_amount) VALUES (?,?,?,?)", [emi.loanID, emi.next_installment, emi.due_date, emi.emi_amount])
        if (rows.affectedRows == 0) {
            return false
        }
    }
        return true
    } catch (err) {
        console.log(err)
          }
}
module.exports={add_next_emi_in_Borrower_EMI_Schedule}