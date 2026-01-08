const e = require("express")
const connection=require("../DB/db")


const Add_penalty = async () => {
    const [loanDetails] = await connection.execute("SELECT loan_id FROM emi_schedule_for_borrower WHERE due_date < (CURDATE() - INTERVAL 7 DAY) AND penalty=0.00 AND amount_paid=0.00")
     
    if (loanDetails.length > 0) {
        for (const loan of loanDetails) {
          await connection.execute("UPDATE loan_details SET total_outstanding = total_outstanding + 100 WHERE loan_id=?",[loan.loan_id])
        }
        const [rows] = await connection.execute("UPDATE emi_schedule_for_borrower SET penalty=100 WHERE due_date < (CURDATE() - INTERVAL 7 DAY) AND penalty=0.00 AND amount_paid=0.00")
        
    } else {
        return 
    }



   
   
}
module.exports={Add_penalty}