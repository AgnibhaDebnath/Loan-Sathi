const AdminModel = require("../Model/AdminModel")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require('uuid');
 const crypto = require("crypto");
    const fs = require("fs");
const path = require("path");
    const Admin = require("firebase-admin")
    const serviceAccount = require("./loan-management-platform-750c5-firebase-adminsdk-fbsvc-35b48e95ad.json");
    Admin.initializeApp({
      credential: Admin.credential.cert(serviceAccount),
     projectId:process.env.PROJECT_ID, // ✅ your Project ID
    });
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

exports.add_loan_detials = async(req,res,next) => { 
    const loanDetails = req.body
    console.log(loanDetails)
    const laonID = uuidv4();
    console.log(laonID)
    try {
        const result =await AdminModel.Add_Loan_Details(loanDetails, laonID)
        if (result) {
            res.status(200).send({message:"Loan details added successfully!"})
        }
        else {
            res.status(500).send({message:"server error!"})
        }
    } catch (err) {
        console.log(err)
    }
    
}

exports.add_borrower_details = async(req,res,next) => {
    const borrowerDetails = req.body
    const imageURL = req.file.originalname
    const fileBuffer = req.file.buffer;
    const hash = crypto.createHash("md5").update(fileBuffer).digest("hex");
    const ext = path.extname(imageURL);
    const hashFileName = `${hash}${ext}`;
const uploadDir = path.join(__dirname, "../Uploads");
    if (!fs.existsSync(uploadDir))
    {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    const uploadPath = path.join(uploadDir, hashFileName);

    
    
    if (fs.existsSync(uploadPath)) {
         res.status(400).send({ error: "Duplicate image detected" });
    }
    else {
      try {
       
    const result = await AdminModel.Add_borrower_details(borrowerDetails, imageURL,hashFileName)
    
        if (result === true) {
         fs.writeFileSync(uploadPath, req.file.buffer);
      res.status(200).send({message:"Borrower details  added successfully"}) 
        }
        else if (result.duplicate) {
        res.status(409).send({message:"Duplicate mobile no detected"})
          }
        else if (result.duplicateID) {
            res.status(409).send({message:"Duplicate loan ID detected"})
    }      
    } catch (err) {
        console.log(err)
    }
      
}

    
}
exports.verify_admin_mobileNo=async (req, res, next) => {
    const { adminName, mobileNo } = req.body
    const trimedName = adminName.trim()
    try {
        
    
    const storedMobileNo = await AdminModel.verify_admin_mobileNo(trimedName)
    if (storedMobileNo === null) {
           
            res.status(404).send({
                success: false,
                message: "Admin name is not found"
            })
    }
    else if (storedMobileNo == mobileNo) {
       res.status(200).send({
                success: true,
                message: "Mobile no exist"
       }) 
     
    }
       else {
              res.status(404).send({
                success: false,
                message: "Mobile no not found"
       })   
        }
    } catch (err) {
        console.log(err)
        }
    
}
exports.verify_admin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(404).send({message: "No token"})
    }
    const decoded=Admin.auth().verifyIdToken(token)
}