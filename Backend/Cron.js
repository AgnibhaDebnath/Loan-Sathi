const cron = require("node-cron")
const { check_starting_date } = require("./Jobs/check_starting_date")
const { getLoansWithEMIStartingToday } = require("./Jobs/getLoansWithEMIStartingToday")
const { add_first_emi_in_Admin_EMI_Schudule } = require("./Jobs/add_EMI_To_Admin_EMI_schedule")
const { add_first_emi_in_Borrower_EMI_Schedule } = require("./Jobs/add_EMI_To_Borrower_EMI_schedule")
const { check_last_emi_due_date } = require("./Jobs/check_emi_last_date")
const { update_total_outstanding } = require("./Jobs/update_total_outstanding")
const { get_loan_details_for_emi } = require("./Jobs/get_loan_details_for_emi")
const {add_next_emi_in_Admin_EMI_Schudule}=require("./Jobs/add_next_emi_in_Admin_EMI_Schudule")
const { add_next_emi_in_Borrower_EMI_Schedule } = require("./Jobs/add_next_emi_in_Borrower_EMI_Schedule")
const { getEMIsWithDueDateToday } = require("./Jobs/getEMIsWithDueDateToday")
const { Add_penalty } = require("./Jobs/Add_penalty")
const {canAddEmi}=require("./Jobs/canAddEmi")
const { loanClose } = require("./Jobs/loanClose")

cron.schedule("10 0 * * *", async () => {
    try {
        const loanIDs = await check_starting_date()
        console.log(loanIDs)
        if (loanIDs.length) {
            
            const loanDetails = await getLoansWithEMIStartingToday(loanIDs)
            console.log(loanDetails)

            const loanIds = []
            const loanAmounts = []
            const loanTenures = []
            const loanInterests=[]
            loanDetails.forEach(loan => {
                loanIds.push(loan.loan_id)
                loanAmounts.push(loan.original_principal)
                loanTenures.push(loan.loan_tenure)
                loanInterests.push(loan.interest_rate)
            })

            let i;
            const emiResults=[]
            for (i = 0; i < loanIds.length; i++){
                const principal = parseFloat(loanAmounts[i]);
                const monthlyInterestRate = parseFloat(loanInterests[i] / 12/100);

                const loanTenure = parseFloat(loanTenures[i])
                
                const emiAmount = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenure) / (Math.pow(1 + monthlyInterestRate, loanTenure) - 1)

                const openingBalance = principal;
                const interestComponent = openingBalance * monthlyInterestRate;
                const principalComponent = 0.00
                const closingBalance = openingBalance
    
                emiResults.push({
                    loanID: loanIds[i],
                    installmentNo: 1,
                    openingBalance: openingBalance.toFixed(2),
                    emiAmount: emiAmount.toFixed(2),
                    interestComponent: interestComponent.toFixed(2),
                    principalComponent: principalComponent.toFixed(2),
                    closingBalance: closingBalance.toFixed(2)
                });
            }

            const result1 = await add_first_emi_in_Admin_EMI_Schudule(emiResults)
            const result2 = await add_first_emi_in_Borrower_EMI_Schedule(emiResults)
            
            if (result1 && result2) {
                console.log("1st EMI added successfully ")
                return
            }
        }
        else {
            return
        }
    } catch (err) {
        console.log("Cron job failed:",err)
          }
})

cron.schedule("20 0 * * *",async()=> {
    try {
        const emiDueDateToday = await getEMIsWithDueDateToday()
        const loanIDs = []
        for (const emi of emiDueDateToday) {
            loanIDs.push(emi.loan_id)
        }

        if (loanIDs.length != 0) {
            const loanDetailsWithDueDateToday = await get_loan_details_for_emi(loanIDs)
            if (loanDetailsWithDueDateToday.length > 0) {
                const emi_amounts = []
                const outstanding_principals = []
                const interest_rates = []
                for (const loan of loanDetailsWithDueDateToday) {
                    emi_amounts.push(loan.emi_amount)
                    outstanding_principals.push(loan.outstanding_principal)
                    interest_rates.push(loan.interest_rate)
            
                }
                let i;
                for (i = 0; i < loanIDs.length; i++) {
                    const result = await update_total_outstanding(loanIDs[i], parseFloat(emi_amounts[i]))
                    if (result == false) {
                        return
                    }
                }
            }
            else {
                return
            }
        }
            await Add_penalty()
console.log("run")
            const result = await check_last_emi_due_date()
            if (result.length == 0) {
                return
            } else {
                const loanIds = []
                const last_due_dates = []
                const last_installment_no = []
                const last_emi_paids = []
            
                for (const emi of result) {
                    const ans =await  canAddEmi(emi.loan_id)
                    if (ans) {
                    loanIds.push(emi.loan_id)
                    const date = new Date(emi.last_due_date)
                    last_due_dates.push(date.toLocaleDateString("en-CA"))
                    last_installment_no.push(emi.last_installment_no)
                    last_emi_paids.push(emi.last_amount_paid)  
                    }
                    else {
                        console.log(`Loan ${emi.loan_id} closed`);
                       await loanClose(emi.loan_id)
                   }
                }

                const loanDetails = await get_loan_details_for_emi(loanIds)
                const emi_amounts = []
                const outstanding_principals = []
                const interest_rates = []
            
                for (const loan of loanDetails) {
                    emi_amounts.push(loan.emi_amount)
                    outstanding_principals.push(loan.outstanding_principal)
                    interest_rates.push(loan.interest_rate)
            
                }


                let i;
                const next_emis = []
                for (i = 0; i < loanIds.length; i++) {
                    const lastDate = new Date(last_due_dates[i])
                    const nextDate = new Date(lastDate)
                    nextDate.setMonth(nextDate.getMonth() + 1);
                    const dueDateForDB = nextDate.toLocaleDateString("en-CA")

                    const monthlyInterestRate = parseFloat(interest_rates[i] / 12 / 100);
                    const interestComponent = parseFloat(outstanding_principals[i]) * monthlyInterestRate
                    const principalComponent = Math.max(0, parseFloat(emi_amounts[i]) - interestComponent);
                    const openingBalance = outstanding_principals[i]
                    const closingBalance = Math.max(0, openingBalance - principalComponent);
                    next_emis.push({
                        loanID: loanIds[i],
                        next_installment: parseFloat(last_installment_no[i]) + 1,
                        due_date: dueDateForDB,
                        emi_amount: parseFloat(emi_amounts[i]),
                        interestComponent: interestComponent,
                        principalComponent: principalComponent.toFixed(2),
                        openingBalance: openingBalance,
                        closingBalance: closingBalance
                    })

                }
                console.log(next_emis)
          

                const result1 = await add_next_emi_in_Admin_EMI_Schudule(next_emis)
                if (result1) {
                    const result2 = await add_next_emi_in_Borrower_EMI_Schedule(next_emis)
                    if (result2) {
                        console.log("EMI added successfully")
                    }
                }
           
            }
        
    } catch (err) {
        console.log(err)
}
})