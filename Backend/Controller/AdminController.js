const AdminModel=require("../Model/AdminModel")
exports.getLoanDetails = async (req, res, next) => {
    try {
        const LoanDetails = await AdminModel.LoanDetails();
            res.status(200).json({
LoanDetails
            })

    }
            catch (error) {
            console.log("Failed to get data from DB", error)
        }
    
    
}
exports.Update_statsu_of_borrower = async(req, res, next) => {
    const { number, status } = req.body;
    console.log(number, status);
    try {
        const result = await AdminModel.Update_statsu_of_borrower_on_database(number, status)
     
        res.status(200).json({"successMessage":result.message})
    } catch (err) {
        console.log(err)
}
}

