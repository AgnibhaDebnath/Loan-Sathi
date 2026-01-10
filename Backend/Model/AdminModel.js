
const connection=require("../DB/db")
const loan_application_details = async (loan_application_per_page, skip, status, loanType) => {


    try {
        const [pending] = await connection.execute("SELECT COUNT(*) FROM loan_application_data WHERE loan_status=?", ["Pending"]);
        const [approved] = await connection.execute("SELECT COUNT(*) FROM loan_application_data WHERE loan_status=?", ["approved"]);
        const [rejected] = await connection.execute("SELECT COUNT(*) FROM loan_application_data WHERE loan_status=?", ["rejected"]);
        
         if (!status && loanType) {
             const [rows] = await connection.execute("SELECT * FROM loan_application_data WHERE loan_type=? LIMIT? OFFSET?  ", [loanType, loan_application_per_page, skip,]);
             return { rows ,count: { pending, approved, rejected }};  
    } else if (!status && !loanType) {
             const [rows] = await connection.execute("SELECT * FROM loan_application_data  LIMIT? OFFSET?  ", [loan_application_per_page, skip,]);
             
        return { rows ,count: { pending, approved, rejected }}; 
    } else if (status && !loanType) {
        const [rows] = await connection.execute("SELECT * FROM loan_application_data WHERE loan_status=? LIMIT? OFFSET?  ",[status,loan_application_per_page,skip,]);
        return { rows ,count: { pending, approved, rejected }};  
    } else {
             const [rows] = await connection.execute("SELECT * FROM loan_application_data WHERE loan_status=? AND loan_type=? LIMIT? OFFSET? ", [status, loanType, loan_application_per_page, skip,]);
             
        return { rows ,count: { pending, approved, rejected }};  
    }
    } catch (error) {
        console.log(error.message)
        throw error;
}
}
const Update_statsu_of_borrower_on_database = async (number, status) => {
    try {
        const sql = "UPDATE loan_application_data SET loan_status = ?, decision_at=CURRENT_TIMESTAMP WHERE mobile_no=? AND loan_status=?"
    
        const [rows] = await connection.execute(sql, [status, number,"pending"])
        if (rows.affectedRows > 0) {
            return { success: true, message: "Loan status update successfull" };
        }
    }
    catch (err) {
        console.log(err)
    }
}
const verify_password = async (mobileNo) => {
    try {
        
    const [rows] =await  connection.execute("SELECT admin_phone_no,admin_password FROM admin_details WHERE admin_phone_no=?", [mobileNo])
    const [{ admin_password }] = rows
    return admin_password
    } catch (err) {
        console.log(err)
        console.log("Data base error")
     }
}
const Add_Loan_Details =async (loanDetails,laonID) => {
    try {
        const [result] = await connection.execute("SELECT borrower_id FROM borrower_details WHERE mobile_no=?", [loanDetails.mobileNo])
       
        if (result.length > 0) {
            const [rows] = await connection.execute("INSERT INTO loan_details  (borrower_id,loan_id,original_principal,outstanding_principal,emi_amount,total_outstanding,interest_rate,loan_tenure,starting_date) VALUES (?,?,?,?,?,?,?,?,?)", [result[0].borrower_id, laonID, loanDetails.loanAmount, loanDetails.loanAmount, loanDetails.emiAmount, 0.00, loanDetails.interestRate, loanDetails.loanTanure, loanDetails.date])
            if (rows.affectedRows > 0) {
                return true;
            }
        } else {
            return false 
        }
    } catch (err) {
        console.log(err)
            return false
        }
}
const Add_borrower_details = async (borrowerDetails, imageURL, hashFileName,firebase_uid) => {
    try {
        const [borrower] = await connection.execute("SELECT 1 FROM borrower_details WHERE borrower_id=?", [borrowerDetails.BorrowerID])
        
        if (borrower.length > 0) {
            console.log("Duplicate")
            return { "duplicateID": true }
        }
        else {
            const [rows] = await connection.execute("INSERT INTO borrower_details  (borrower_id,firebase_uid,borrower_name,mobile_no,original_name,image_url) VALUES (?,?,?,?,?,?)", [borrowerDetails.BorrowerID,firebase_uid ,borrowerDetails.BorrowerName, borrowerDetails.mobileNo, imageURL, hashFileName])
    
            if (rows.affectedRows > 0) {
                return true;
            }
        }
    } catch (err) {
        if (err.code == "ER_DUP_ENTRY") {
            console.log("Duplicate mobile no detected")
            return{"duplicate":true}
        }
        console.error(err);
        return false;
    }
 
}
const verify_admin_mobileNo = async(trimedName) => {
         try {
        const [rows] = await connection.execute("SELECT * FROM admin_details WHERE admin_name = ? ", [trimedName]) 
        if (rows.length == 0) {
            return null
        } else {
        const [{ admin_phone_no }] = rows;
       
        return admin_phone_no  
        }


    } catch(err) {
        console.log(err)
    }
 }
const verify_admin = async (uid, phoneNo) => {
    try {
    const [uidRows] = await connection.execute("SELECT firebase_uid,admin_phone_no FROM admin_details WHERE firebase_uid=?", [uid])
    if (uidRows.length > 0) {
        const admin = uidRows[0]
        if (admin.admin_phone_no !== phoneNo) {
            return { status: "conflict" }
        }
        return { status: "exist" }
    } else {
        const [mobileRows] = await connection.execute("SELECT admin_phone_no,firebase_uid FROM admin_details WHERE admin_phone_no=?", [phoneNo])
        const admin = mobileRows[0]
        if (!admin.firebase_uid) {
            await connection.execute("UPDATE admin_details SET firebase_uid=?,role=? WHERE admin_phone_no=?", [uid, "admin", phoneNo])
            return {status:"updated"}
        }
        }
    } catch (err) {
        console.log("Data base error:", err)
        throw err
         }
}

const verify_role = async (uid, phoneNo) => {
    try {
    const [rows] = await connection.execute("SELECT firebase_uid,role,admin_phone_no FROM admin_details WHERE firebase_uid=? AND admin_phone_no=?", [uid, phoneNo])
    if (rows.length == 0) {
       return null 
    }
    else {
        return rows[0].role
        }
    } catch (err) {
        console.log("Data base error:",err)
         }
}

const get_firebaseUid = async(mobileNo)=> {
    const [rows] = await connection.execute("SELECT firebase_uid FROM loan_application_data WHERE mobile_no=?", [mobileNo])
    const [{ firebase_uid }] = rows
    return firebase_uid
    
}
const get_emi_details_for_Admin = async (limit, skip) => {
    try {
        const [count]=await connection.execute("SELECT COUNT(*) FROM emi_schedule")
   
        const [rows] = await connection.execute("SELECT b.borrower_name,b.borrower_id,b.mobile_no,l.loan_id,l.emi_amount,l.total_outstanding,emiA.due_date,emiA.installment_no,emiB.amount_paid,emiB.penalty,emiB.payment_date FROM borrower_details b JOIN loan_details l ON b.borrower_id=l.borrower_id JOIN emi_schedule_for_borrower emiB ON  l.loan_id=emiB.loan_id JOIN emi_schedule emiA ON l.loan_id=emiA.loan_id AND emiA.installment_no = emiB.installment_no ORDER BY emiA.installment_no DESC LIMIT ? OFFSET ?", [limit, skip])
        
        return { rows,count }
    } catch (err) {
        console.log(err)
     }
}
const update_payment = async (loanID, installmentNo, payment) => {
    try {
   
        const [loanData] = await connection.execute("SELECT outstanding_principal,interest_rate,emi_amount FROM loan_details WHERE loan_id=?", [loanID])
        const emiAmount=parseFloat(loanData[0]?.emi_amount) 
        const [emiData] = await connection.execute("SELECT penalty,due_date FROM emi_schedule_for_borrower WHERE loan_id=? AND installment_no=?", [loanID, installmentNo])
        const penalty = parseFloat(emiData[0]?.penalty);
        const dueDate = emiData[0]?.due_date;
console.log(dueDate)
        const outstanding_principal = loanData[0]?.outstanding_principal;
        const annual_rate = loanData[0]?.interest_rate;
        const monthlyInterest = parseFloat(outstanding_principal) * (annual_rate / 12 / 100);
    
        const principal_paid = Math.max(0, parseFloat(payment) - monthlyInterest - parseFloat(penalty));
    
       
        if (new Date(dueDate).getTime() < new Date().getTime() && payment <= (emiAmount + penalty)) {
            const [emiUpdate] = await connection.execute("UPDATE emi_schedule_for_borrower SET amount_paid=?,payment_date=? WHERE loan_id=? AND installment_no=? AND amount_paid=0.00", [payment, new Date(), loanID, installmentNo])
            if (emiUpdate.affectedRows > 0) {
                           await connection.execute("UPDATE loan_details SET outstanding_principal=outstanding_principal - ? , total_outstanding = total_outstanding - ?,updated_at=? WHERE loan_id=? ", [principal_paid, payment, new Date(), loanID])
                           return true 
            } else {
                return {success:"false",message:"payment details already updated"}
            }

            
            
            
        } else if (new Date(dueDate).getTime() < new Date().getTime() && payment > (emiAmount + penalty)) {
            const [emiUpdate] = await connection.execute("UPDATE emi_schedule_for_borrower SET amount_paid=?,payment_date=? WHERE loan_id=? AND installment_no=? AND amount_paid=0.00", [payment, new Date(), loanID, installmentNo])
            if (emiUpdate.affectedRows > 0) {
                await connection.execute("UPDATE loan_details SET outstanding_principal=outstanding_principal - ? , total_outstanding = total_outstanding - ?,updated_at=? WHERE loan_id=? ", [principal_paid, emiAmount + penalty, new Date(), loanID])
                return true
            } else {
               return {success:"false",message:"payment details already updated"} 
            }
        } else if (new Date(dueDate).getTime() > new Date().getTime() && payment >= (emiAmount + penalty)) {
            const[emiUpdate] = await connection.execute("UPDATE emi_schedule_for_borrower SET amount_paid=?,payment_date=? WHERE loan_id=? AND installment_no=? AND amount_paid=0.00", [payment, new Date(), loanID, installmentNo])
            if (emiUpdate.affectedRows > 0) {
             await connection.execute("UPDATE loan_details SET outstanding_principal=outstanding_principal - ? ,updated_at=? WHERE loan_id=? ", [principal_paid, new Date(), loanID])

            await connection.execute("UPDATE emi_schedule_for_borrower SET outstanding_added=? WHERE loan_id=? AND installment_no=?",["true",loanID,installmentNo])
             return  true    
            } else {
                       return {success:"false",message:"payment details already updated"} 
            }

            }
        else {
            return { seccess: false, message: "You can not add partial payment before due date" }
}

    } catch (err) {
        console.log(err);
    
         }
}
module.exports = { loan_application_details,Update_statsu_of_borrower_on_database,verify_password,Add_Loan_Details,Add_borrower_details,verify_admin_mobileNo,verify_admin,verify_role,get_firebaseUid,get_emi_details_for_Admin,update_payment }