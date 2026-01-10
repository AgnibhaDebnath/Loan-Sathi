const connection=require("../DB/db")

const check_last_emi_due_date = async () => {
    try {
        
        const [rows] = await connection.execute("SELECT loan_id,MAX(installment_no) as last_installment_no,MAX(due_date) as last_due_date  FROM emi_schedule_for_borrower WHERE amount_paid >=(emi_amount + penalty) GROUP BY loan_id HAVING MAX(due_date)=?",[new Date().toLocaleDateString("en-CA")])
        if (rows.length > 0){
      return rows  
        } else {
            return []
}
   
    } catch (err) {
        console.log(err)
          }

}
module.exports={check_last_emi_due_date}