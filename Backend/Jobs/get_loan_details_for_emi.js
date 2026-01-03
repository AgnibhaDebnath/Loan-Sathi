const connection=require("../DB/db")
const get_loan_details_for_emi = async (loanIds) => {
    try {
    const placeholders = loanIds.map(() => "?").join(",")
        const [rows] = await connection.execute(`SELECT emi_amount,outstanding_principal,interest_rate FROM loan_details WHERE loan_id IN (${placeholders}) `, [...loanIds])
        if (rows.length > 0) {
            return rows
        } else {
            return []
        }
    }

    catch (err) {
        console.log(err)
    }
}
module.exports={get_loan_details_for_emi}