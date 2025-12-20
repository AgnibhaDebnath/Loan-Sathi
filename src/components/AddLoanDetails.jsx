import { useState, useRef } from "react"
import { Input } from "./ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "./ui/button"
import { format } from "date-fns"
import { CircleX } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
const AddLoanDetails = () => {
    const [date, setDate] = useState("")
    const [BorrowerName, setBorrowerName] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [mobileNoInLoan, setBorrowerNoInLoan] = useState("")
    const [loanAmount, setLoanAmount] = useState("")
    const [EMIAmount, setEMIAmount] = useState("")
    const [loanTanure, setLoanTanure] = useState("")
    const [interestRate, setInterestRate] = useState("")
    const [error, setError] = useState("")
    const [borrowerImage, setBorrowerImage] = useState(null);
    const [borrowerError, setBorrowerError] = useState("")
    const fileInputRef = useRef(null);
    const validate_Borrower_details = () => {
        const loan_Borrower_errors = {}
        if (!BorrowerName.trim()) loan_Borrower_errors.nameError = "Borrower name is required"
        if (!mobileNo.trim()) loan_Borrower_errors.numberError = "Mobile no is required"
        if (!borrowerImage) loan_Borrower_errors.imageError = "Borrrower image is required"
        setBorrowerError(loan_Borrower_errors)
        return Object.keys(loan_Borrower_errors).length === 0
    }
    const validate_loan_details = () => {
        const loan_details_errors = {}

        if (!mobileNoInLoan.trim()) loan_details_errors.numberError = "Mobile no is required"
        if (!loanAmount.trim()) loan_details_errors.loanAmountError = "Loan amount is required"
        if (!EMIAmount.trim()) loan_details_errors.EMIAmountErrror = "EMI amount is required"
        if (!loanTanure.trim()) loan_details_errors.loanTanureError = "Loan tanure is required"
        if (!date) loan_details_errors.dateError = "EMI starting date is required"
        if (!interestRate.trim()) loan_details_errors.interestError = "Interesst rate is required"

        setError(loan_details_errors)
        return Object.keys(loan_details_errors).length === 0
    }
    const handleBorrower_details = async (e) => {
        e.preventDefault()
        if (validate_Borrower_details()) {
            const formData = new FormData()
            formData.append("BorrowerName", BorrowerName)
            formData.append("mobileNo", mobileNo)
            formData.append("image", borrowerImage)
            try {
                const res = await fetch("http://localhost:3000/borrower-Details", {
                    method: "POST",
                    body: formData
                })
                console.log(res.ok)
                if (res.ok) {
                    const data = await res.json()
                    const { message } = data
                    setBorrowerName("")
                    setMobileNo("")
                    setBorrowerImage(null); if (fileInputRef.current) { fileInputRef.current.value = ""; }
                    console.log(message)
                    toast.success(message, {
                        position: "top-center",
                        autoClose: 5000,
                        theme: "light"
                    })
                }
                else if (res.status == 400) {
                    const data = await res.json()
                    const { error } = data
                    setBorrowerImage(null)
                    toast.error(error, {
                        position: "top-center",
                        autoClose: 5000,
                        theme: "light"
                    })
                }
                else if (res.status == 409) {
                    const data = await res.json()
                    const { message } = data
                    setMobileNo("")
                    toast.error(message, {
                        position: "top-center",
                        autoClose: 5000,
                        theme: "light"
                    })
                }
            } catch (err) {

            }
        } else {
            return
        }
    }
    const handleSubmit_Of_LoanDetails = async (e) => {
        e.preventDefault();
        if (validate_loan_details()) {
            try {
                const res = await fetch("http://localhost:3000/loan-Details", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "mobileNo": mobileNoInLoan, "loanAmount": loanAmount, "interestRate": interestRate, "EMIAmount": EMIAmount, "loanTanure": loanTanure, "date": format(date, "yyyy-MM-dd") })
                })
            } catch (err) {
                console.log(err)
            }

        } else {
            return
        }
    }
    return (
        <>

            <div className="bg-black w-full flex justify-center py-2 ">
                <div className="bg-black md:w-3/4 w-11/12 rounded-2xl border-2 border-gray-400 my-1">
                    <div className="flex justify-center ">
                        <h1 className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent text-4xl font-bold md:text-5xl">Add Borrower details</h1>
                    </div>
                    <form onSubmit={handleBorrower_details} >
                        <ToastContainer />
                        <div className="flex items-center flex-col gap-3 my-8  ">

                            <Input
                                value={BorrowerName}
                                onChange={e => setBorrowerName(e.target.value)}
                                placeholder="Enter borrower name"
                                className="  w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12 font-medium rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-200 outline-none"
                            />
                            {borrowerError.nameError && <p className="text-red-500 font-medium"><CircleX className="inline" />{borrowerError.nameError}</p>}
                            <Input
                                value={mobileNo}
                                onChange={e => setMobileNo(e.target.value)}
                                placeholder="Enter mobile no"
                                className="  w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12 font-medium rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-200 outline-none"
                            />
                            {borrowerError.numberError && <p className="text-red-500 font-medium"><CircleX className="inline" />{borrowerError.numberError}</p>}
                            <label
                                className="
    w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12
    flex items-center justify-center
    px-4 py-1 cursor-pointer
    rounded-xl border-2 border-white/30
    bg-white/10 backdrop-blur-md
    text-white font-medium
    
    hover:bg-white/20 transition-all duration-200
  "
                            >
                                {borrowerImage ? borrowerImage.name : "Upload Borrower Image"}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setBorrowerImage(e.target.files[0])}
                                    className="hidden"
                                    ref={fileInputRef}
                                />
                            </label>
                            {borrowerError.imageError && <p className="text-red-500 font-medium"><CircleX className="inline" />{borrowerError.imageError}</p>}
                            <Button type="submit" className="bg-gradient-to-r from-pink-400 to-red-500">Add Borrower details</Button>

                        </div>
                    </form>
                    <form onSubmit={handleSubmit_Of_LoanDetails}>
                        <div className="flex items-center flex-col gap-3 my-8  ">
                            <div className="flex justify-center ">
                                <h1 className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent text-4xl font-bold md:text-5xl">Add Loan details</h1>
                            </div>
                            <Input
                                value={mobileNoInLoan}
                                onChange={e => setBorrowerNoInLoan(e.target.value)}
                                placeholder="Enter mobile no "
                                className="  w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12 font-medium rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-200 outline-none"
                            />
                            {error.numberError && <p className="text-red-500 font-medium"><CircleX className="inline" />{error.numberError}</p>}
                            <Input
                                value={loanAmount}
                                onChange={e => setLoanAmount(e.target.value)}
                                placeholder="Enter loan amount "
                                className="  w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12 font-medium rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-200 outline-none"
                            />

                            {error.loanAmountError && <p className="text-red-500 font-medium"><CircleX className="inline" />{error.loanAmountError}</p>}
                            <Input
                                value={interestRate}
                                onChange={e => setInterestRate(e.target.value)}
                                placeholder="Enter interest rate"
                                className="  w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12 font-medium rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-200 outline-none"
                            />
                            {error.interestError && <p className="text-red-500 font-medium"><CircleX className="inline" />{error.interestError}</p>}
                            <Input
                                value={EMIAmount}
                                onChange={e => setEMIAmount(e.target.value)}
                                placeholder="Enter EMI amount "
                                className="  w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12 font-medium rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-200 outline-none"
                            />
                            {error.EMIAmountErrror && <p className="text-red-500 font-medium"><CircleX className="inline" />{error.EMIAmountErrror}</p>}
                            <Input
                                value={loanTanure}
                                onChange={e => setLoanTanure(e.target.value)}
                                placeholder="Enter laon tenure "
                                className="  w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12 font-medium rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-200 outline-none"
                            />
                            {error.loanTanureError && <p className="text-red-500 font-medium"><CircleX className="inline" />{error.loanTanureError}</p>}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="  w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12
  font-medium rounded-xl border-2 border-white/30
  bg-white/10 backdrop-blur-md text-white
  hover:bg-white/20 hover:text-white
  transition-all duration-200 outline-none" >
                                        {date ? format(date, "PPP") : "Pick EMI start date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        captionLayout="dropdown"
                                        className="      rounded-xl border border-white/20 
 
"


                                        fromYear={new Date().getFullYear()}
                                        // ✅ earliest year allowed 
                                        toYear={new Date().getFullYear() + 5}
                                        disabled={(day) => day < new Date().setHours(0, 0, 0, 0)}
                                        fromDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)}
                                    />
                                </PopoverContent>
                            </Popover>
                            {error.dateError && <p className="text-red-500 font-medium"><CircleX className="inline" />{error.dateError}</p>}


                            <Button type="submit" className="bg-gradient-to-r from-pink-400 to-red-500">Add Loan
                                details</Button>
                        </div>
                    </form>



                </div>
            </div >
        </>
    )
}
export default AddLoanDetails