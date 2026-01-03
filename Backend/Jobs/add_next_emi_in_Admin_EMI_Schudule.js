const connection = require("../DB/db")

const add_next_emi_in_Admin_EMI_Schudule = async (next_emis) => {
    try {
    
    for (const emi of next_emis) {
        const [rows] = await connection.execute("INSERT INTO emi_schedule (loan_id,installment_no,due_date,opening_balance,principal_component,interest_component,emi_amount,closing_balance) VALUES (?,?,?,?,?,?,?,?)", [emi.loanID, emi.next_installment, emi.due_date, emi.openingBalance, emi.principalComponent, emi.interestComponent, emi.emi_amount, emi.openingBalance])

        if (rows.affectedRows == 0) {
           return false
        }
      
        }
         return true 
    } catch (err) {
        console.log(err)
           }

}
module.exports={add_next_emi_in_Admin_EMI_Schudule}