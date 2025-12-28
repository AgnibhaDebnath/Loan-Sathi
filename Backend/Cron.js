const cron = require("node-cron")
const { updateLoanStatusToStarted } = require("./Jobs/updateLoanStatusToStarted")
const {getLoansWithEMIStartingToday}=require("./Jobs/getLoansWithEMIStartingToday")
cron.schedule("* * * * *", async () => {
    try {
        const result = await updateLoanStatusToStarted()
        console.log(result.loanStatus)
        if (result.loanStatus) {
            console.log("i am here")
            const { loanIDs } = result
            const loanDetails = await getLoansWithEMIStartingToday(loanIDs)
            const loanIds = []
            const loanAmounts=[]
            loanDetails.forEach(loan => {
                loanIds.push(loan.loan_id)
                loanAmounts.push(loan.original_principal)
            })
        }
        else {
            return
        }
    } catch (err) {
        console.log("Cron job failed:",err)
          }
})