const AdminModel = require("../Model/AdminModel")
const bcrypt=require("bcrypt")
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
exports.verify_password = async (req, res, next) => {
    try {
        const { password,adminName } = req.body;
        const userPassword = password.trim()
        const trimedName=adminName.trim()
        
       

        const storedPassword = await AdminModel.verify_password(trimedName)
        if (storedPassword === null) {
            res.json({
                success:false,message:"Admin name is not found"
            })
        }
        
        bcrypt.compare(userPassword, storedPassword, (err, isMatch) => {
            if (err) {
        console.error("Error comparing passwords:", err);
        return;
            }
            else if (isMatch) {
                       res.json({
            success:true,message:"password verification successfull"
        }) 
            }
            else {
        res.json({
        success:false,message:"Wrong password"
        }) 
            }
        })
    

    
    } catch (err) {
        console.log(err)
    }



}

