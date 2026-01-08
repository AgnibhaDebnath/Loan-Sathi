const AdminModel = require("../Model/AdminModel")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require('uuid');
 const crypto = require("crypto");
    const fs = require("fs");
const path = require("path");
const Admin = require("firebase-admin");



exports.getLoanDetails = async (req, res, next) => {
    
    const loan_application_per_page = req.query.limit
    const skip = req.query.skip
    const status = req.body.statusFilter
    console.log( status)
    const loanType = req.body.loanTypeFilter
    const token = req.headers.authorization?.split(" ")[1]


    try {
        if (!token) {
            res.status(401).send({success:"false",message:"No authentication token provided"})
        }
        const decoded = await Admin.auth().verifyIdToken(token);
        const uid = decoded.uid
        
        const phoneNoFull=decoded.phone_number
        const phoneNo = phoneNoFull.startsWith("+91") ? phoneNoFull.slice(3) : phoneNoFull
        const role = await AdminModel.verify_role(uid, phoneNo)
        
        if (role !== "admin") {
    return res.status(403).send({success:"false",message:"Forbidden:admin only!"})
        } else {

            const Loan_application_Details = await AdminModel.loan_application_details(loan_application_per_page, skip, status, loanType);
            const {rows,count}=Loan_application_Details
            res.status(200).json({ loans: rows, count 
            })  
           
   
}        
    }
            catch (error) {
       console.log(error)
        return res.status(403).send({success: "false", message: "Invalid or expired token"})
        
        }
    
    
}
exports.Update_statsu_of_borrower = async(req, res, next) => {
    const { number, status } = req.body;
    console.log(number, status);
   
    try {
        const result = await AdminModel.Update_statsu_of_borrower_on_database(number, status)
     console.log(result .message)
        res.status(200).json({"successMessage":result.message})
    } catch (err) {
        console.log(err)
}
}
exports.verify_password = async (req, res, next) => {
    try {
        const { password,mobileNo } = req.body;
        const userPassword = password.trim()
        

        const storedPassword = await AdminModel.verify_password(mobileNo)

        bcrypt.compare(userPassword, storedPassword, (err, isMatch) => {
            if (err) {
        console.error("Error comparing passwords:", err);
        return;
            }
            else if (isMatch) {
                res.status(200).json({
                    verify: true,
                    inform: "password verification successfull"
        }) 
            }
            else {
        res.status(401).json({
        verify:false,inform:"Wrong password"
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
            res.status(404).send({message:"Borrower not found!"})
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
    const firebase_uid=await AdminModel.get_firebaseUid(borrowerDetails.mobileNo)
       console.log(firebase_uid)
    const result = await AdminModel.Add_borrower_details(borrowerDetails, imageURL,hashFileName,firebase_uid)
    
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
exports.verify_admin = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization?.split(" ")[1];
      
    if (!token) {
        res.status(404).send({message: "No token"})
    }
        const decoded = await Admin.auth().verifyIdToken(token)
        
        const uid = decoded.uid
        const phoneNoFull=decoded.phone_number
        const phoneNo = phoneNoFull.startsWith("+91") ? phoneNoFull.slice(3): phoneNoFull
        const result = await AdminModel.verify_admin(uid, phoneNo)
        
    if (result.status == "exist") {
        res.status(200).send({message:"Mobile no verificatiion successfull"})
    } else if (result.status == "updated") {
        res.status(200).send({message:"Firebase UID linked to admin"})
    }
    } catch (err) {
        console.log(err)
        res.status(500).send({message:"server error!"})
  }
    
    
}

exports.verify_token_For_admin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
    if (!token) {
      return  res.status(401).send({success:"false",message:"No authentication token provided"})
    } else {
        const decoded = await Admin.auth().verifyIdToken(token);
        const uid = decoded.uid
        
        const phoneNoFull=decoded.phone_number
        const phoneNo = phoneNoFull.startsWith("+91") ? phoneNoFull.slice(3) : phoneNoFull
        const role = await AdminModel.verify_role(uid, phoneNo)
        
        if (role !== "admin") {
    return res.status(403).send({success:"false",message:"Forbidden:admin only!"})
        } else {
            return res.status(200).send({success:"true",message:"Welcome !!"})
}
        }
    } catch (err) {
        console.log(err)
        return res.status(403).send({success: "false", message: "Invalid or expired token"})
         }
   
}

exports.get_emi_details_for_Admin= async (req, res, next) => {
    try {
    const limit = req.query.limit
    const skip= req.query.skip
        const result = await AdminModel.get_emi_details_for_Admin(limit, skip)
        const {rows,count}=result
    if(rows.length>0 && count.length>0){
        res.status(200).send({ emiDetails:rows,totalEMI:count})     
    } 
    } catch (err) {
        console.log(err)
        res.status(500).send({message:"Error while fatching emi details"})
}
    
}

exports.update_payment = async (req, res, next) => {
    try {
    const { loanID, installmentNo, payment } = req.body;
        const result = await AdminModel.update_payment(loanID, installmentNo, payment);
        console.log(result)
        if (result) {
            res.status(200).send({success:true,message:"payment details updated successfully"})
        } else {
           res.send({success:false,message:"payment details already updated"})  
        }
    } catch (err) {
    console.log(err)
   } 
}