const connection = require("../DB/db")
const add_first_emi_in_Admin_EMI_Schudule = async (emiResults) => {
    try {
        
    for (const emi of emiResults) {
        const [rows] =await  connection.execute("INSERT INTO emi_schedule (loan_id,installment_no,due_date,opening_balance,principal_component,interest_component,emi_amount,closing_balance ) VALUES(?,?,?,?,?,?,?,?)", [emi.loanID,
            emi.installmentNo,
            new Date().toLocaleDateString("en-CA"),
            emi.openingBalance,
            emi.principalComponent,
            emi.interestComponent,
            emi.emiAmount,
            emi.closingBalance]) 
            if (rows.affectedRows == 0) {
            return false
        }
        }
return true
        
    } catch (err) {
        console.log(err)
         }
}
module.exports={add_first_emi_in_Admin_EMI_Schudule}