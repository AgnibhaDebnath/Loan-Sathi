const connection=require("../DB/db")
const check_starting_date= async () => {
    try {
        const [rows] = await connection.execute("SELECT loan_id FROM loan_details WHERE starting_date=?", [new Date().toLocaleDateString("en-CA")])
         
        if (rows.length > 0) {
        const loanIDs = rows.map(r => r.loan_id)
        const placeholders = loanIDs.map(() => "?").join(",");
            const [result] = await connection.execute(`UPDATE loan_details SET updated_at=? WHERE loan_id IN (${placeholders})`, [new Date(), ...loanIDs])
            if (result.affectedRows > 0) {
                return loanIDs
            }
    }
    else {
        return []
        }
    } catch (err) {
        console.log(err)
        throw err
          }
}

module.exports={check_starting_date}
