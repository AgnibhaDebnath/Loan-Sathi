const connection=require("../DB/db")

const canAddEmi = async (loanID) => {
    const [loanDetails] = await connection.execute("SELECT outstanding_principal,total_outstanding FROM loan_details WHERE loan_id=?", [loanID])
    if (loanDetails[0]?.outstanding_principal>0 && loanDetails[0]?.total_outstanding) {
    return true
    } else {
       return  false
}
}
module.exports={canAddEmi}