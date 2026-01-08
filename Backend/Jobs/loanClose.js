const connection=require("../DB/db")

const loanClose = async(loanID)=>{
    try {
        const [rows] = await connection.execute("UPDATE loan_details SET status=? WHERE loan_id=?", ["closed", loanID])
        return rows.affectedRows > 0
    } catch (err) {
        console.log(err)
        false
    }
}
module.exports={loanClose}