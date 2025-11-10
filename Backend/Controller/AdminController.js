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

