const Model=require("../Model/ClintModel")
exports.LoanApplyVerification  =async (req, res, next) => {
    const LoanData = req.body; 
    try {
        const result = await Model.LoanFormSubmission(LoanData); // ✅ await added
        if (!result.inserted) {
            res.status(409).json({
     message:"Mobile no already exists"
            })
        }
        else {
            res.status(200).json(
                {
                    message:"Loan application successfull"
                }
            )
        }  
    } catch (err) {
        console.error("❌ Loan submission failed:", err.message);
        res.status(500).json({
            message: "Loan Application failed",
            error: err.message
        });
    }
};