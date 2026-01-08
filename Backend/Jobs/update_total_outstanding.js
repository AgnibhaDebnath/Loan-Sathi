const connection=require("../DB/db")
const update_total_outstanding = async (loanID, emi_amount) => {
    console.log(loanID,  emi_amount)
    try {
        const [emiDetails] = await connection.execute("SELECT outstanding_added FROM emi_schedule_for_borrower WHERE loan_id=?", [loanID])
        if (!emiDetails.outstanding_added) {
            const [rows] = await connection.execute("UPDATE loan_details SET total_outstanding=total_outstanding + ? WHERE loan_id=?", [emi_amount , loanID]) 
            await connection.execute("UPDATE emi_schedule_for_borrower SET outstanding_added=? WHERE loan_id=?",["true",loanID])
       
        if (rows.affectedRows == 0) {
            return false
            } 
            return true
        } else {
            return true
             }
    } catch (err) {
        console.log(err)
        return false
      }
}
module.exports={update_total_outstanding}