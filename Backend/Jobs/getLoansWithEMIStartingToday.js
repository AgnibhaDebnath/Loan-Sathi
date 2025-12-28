const connection=require("../DB/db")

const getLoansWithEMIStartingToday = async (loanIDs) => { 
    try{
    const placeholders=loanIDs.map(()=>"?").join(",")
    const [rows] = await connection.execute(`SELECT loan_id,original_principal,interest_rate,loan_tenure FROM loan_details WHERE loan_id IN (${placeholders})`, [...loanIDs])
        return rows
    } catch (err) {
        console.log(err)
        return []
         }
};
module.exports={ getLoansWithEMIStartingToday}