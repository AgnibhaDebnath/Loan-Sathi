const Model = require("../Model/ClintModel")
const Admin = require("firebase-admin")
const serviceAccount = require("./loan-management-platform-750c5-firebase-adminsdk-fbsvc-35b48e95ad.json");
Admin.initializeApp({
  credential: Admin.credential.cert(serviceAccount),
 projectId: process.env.PROJECT_ID, // ✅ your Project ID
});
exports.LoanApplyVerification  =async (req, res, next) => {
    const LoanData = req.body; 
    try {
        const result = await Model.LoanFormSubmission(LoanData); // ✅ await added
        
            res.status(200).json(
                {
                    message:"Loan application successfull"
                }
            )
      
    } catch (err) {
        console.error("❌ Loan submission failed:", err.message);
        res.status(500).json({
            message: "Loan Application failed",
            error: err.message
        });
    }
};
exports.FindBorrower = async (req, res, next) => {
    const MobileNo = req.body.mobileNo;
    
    try {
        const result = await Model.findBorrowerByPhone(MobileNo)
        if (result) {
            res.status(200).json({ exist: true })
        } else {
            res.json({ exist: false })
        }
        
    } catch (err) {
        res.status(500).json({ message: "Server error! try again later" });
    }
    
};
exports.loanDataForAuthUser =async (req,res,next) => {
    
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Missing authorization token" });
        }

        const tokenId = authHeader.split(" ")[1];
        
        if (!tokenId) {
            return res.status(401).json({ message: "Invalid authorization header" });
        }
        const decoded = await Admin.auth().verifyIdToken(tokenId);
      
        const result = await Model.loanDataForAuthUser(decoded); 
        res.status(200).json({user:result})
    } catch (err) {
        // console.log(err)
    }
    
}

exports.checkToken = async(req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
      await Admin.auth().verifyIdToken(token);

      return res.status(200).json({ message: "Token is valid" });

    } catch (err) {
      console.log(err)
    return res.status(401).json({ message: "Token expired or invalid" }); // expired or invalid
  }
}
exports.verifyBorrower =async (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
       
        if (!token) return res.status(401).json({ message: "No token" });
        const decoded = await Admin.auth().verifyIdToken(token);
        const uid = decoded.uid
        const phoneNoFull=decoded.phone_number
        const phoneNo = phoneNoFull.startsWith("+91") ? phoneNoFull.slice(3): phoneNoFull
        
        const result = await Model.verifyBorrower(uid, phoneNo)
        console.log(result)
        if (result.status == "exist") {
            res.status(200).send({
message:"Login successfull"
            })
        }
        else if (result.status == "updated") {
            res.status(200).send({message:"Firebase UID linked to borrower"})
        }
        
    } catch(err) {
        console.log(err)
        res.status(500).send({message:"Server error!"})
    }
    

   
}
exports.get_loan_details =async (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    try {
        
 
    if (!token) {
        return res.status(401).send({success:"false",message:"No authentication token provided"})
    }
    else {
        const decoded = await Admin.auth().verifyIdToken(token);
        const uid = decoded.uid
        const result = await Model.get_loan_details(uid)
        if (result == null) {
    res.status(404).send({loanDetails:null })
        } else {
       
        res.status(200).send({loanDetails:result })     
}
        }
    } catch (err) {
        console.log("server error:",err)
           }
    
}

exports.get_emi_details = async (req, res, next) => {
    const emi_per_page = req.query.limit
    const skip=req.query.skip
    const { loanID } = req.body
    try {
        const result = await Model.get_emi_details(loanID,skip,emi_per_page)
        const { rows, countPaidorUnpaidEMI } = result
       
    if (rows.length>0 && countPaidorUnpaidEMI.length>0) {
        res.status(200).send({emiDetails:rows,paidorUnpaidEMINumber:countPaidorUnpaidEMI})
    }
    else {
       res.status(404).send({emiDetails:[],paidorUnpaidEMINumber:[]}) 
    }   
    } catch (err) {
        console.log(err)
    }

   
}
