const connection=require("../DB/db")

const getEMIsWithDueDateToday = async () => {
    try {
            const [rows] = await connection.execute("SELECT loan_id,MAX(due_date) as due_date FROM emi_schedule_for_borrower  GROUP BY loan_id HAVING MAX(due_date)=?", [new Date().toLocaleDateString("en-CA")])
        if (rows.length > 0) {
                return rows  
        } else {
            return []
            }
       
        } catch (err) {
        console.log(err)
          }
  
}
module.exports={getEMIsWithDueDateToday}