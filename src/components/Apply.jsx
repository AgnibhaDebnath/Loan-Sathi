import { useContext, useState, useEffect } from "react";
import { ModelContext } from "../Contaxt/ModelContext";
import { X } from 'lucide-react';
import { CircleX } from 'lucide-react'
import { auth } from "../Firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Select, SelectGroup, SelectValue, SelectContent, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
const Apply = () => {
    const { isOpen, setIsOpen } = useContext(ModelContext);
    const { Borrowerlogin, setBorrowerlogin } = useContext(ModelContext);

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [mobileNO, setMobileNo] = useState("");
    const [loanType, setLoanType] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [error, setError] = useState({});
    const [popup, setPopup] = useState(false);
    const [OTPsend, setOTPSend] = useState(false)
    const [otp, setotp] = useState("")
    const [isverified, setIsVerified] = useState(false)
    const [confirmationResult, setconfirmationResul] = useState("")
    const [recaptchaerror, setRecaptchaerror] = useState("")
    const [validOTP, setValidOTP] = useState(true)
    const [validMobileNo, setValidmobileNo] = useState(true)
    const [message, setMessage] = useState("")
    const [formSubmit, setFormSubmit] = useState(false)
    const validate = () => {
        const errors = {};
        if (!firstName.trim()) errors.firstName = "First name is required";
        if (!lastName.trim()) errors.lastName = "Last name is required";
        if (!mobileNO.trim()) errors.mobile = "Mobile number is required";
        if (!loanType.trim()) errors.loan = "Loan type is required";
        if (!loanAmount.trim()) errors.amount = "Loan amount is required";
        setError(errors);
        return Object.keys(errors).length === 0 && validMobileNo;
    };

    // Setup reCAPTCHA (required by Firebase)
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: (response) => {
                    console.log("reCAPTCHA verified ✅");
                },

            });
            window.recaptchaVerifier.render().then((widgetId) => {
                window.recaptchaWidgetId = widgetId;
            });

        }
    };
    // Submit form data
    const submitFormData = async () => {
        try {
            const response = await fetch("http://localhost:3000/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Borrower: [firstName, lastName], MobileNo: mobileNO, LoanType: loanType, LoanAmount: loanAmount })
            })
            const data = await response.json()
            const { message } = data;

            if (response.ok) {
                setMessage(message);
                // Reset form
                setFirstName("");
                setLastName("");
                setMobileNo("");
                setLoanType("");
                setLoanAmount("");
                setRecaptchaerror("");
                setotp("");
                setOTPSend(false);
                setValidOTP(true);
                setPopup(true);
                setTimeout(() => {
                    setPopup(false);
                    setIsVerified(false);
                    setBorrowerlogin(true)
                }, 3000);
            } else {
                setIsOpen(true)
                setotp("")
                alert(message)

            }
        } catch (err) {
            console.error(err);
            setotp("");
            setOTPSend(false);
            setValidOTP(true)
            alert("Failed to submit loan application");
        }
    }

    // Verify OTP
    const verifyOtp = async () => {
        try {
            await confirmationResult.confirm(otp);
            setIsVerified(true);
            submitFormData()
            setOTPSend(false)

        } catch (err) {
            console.error(err);
            setIsVerified(false);
            setValidOTP(false)

        }

    };
    useEffect(() => {
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
        }
        setupRecaptcha();
    }, []);
    // Handle loan form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const response = await fetch("http://localhost:3000/borrowerLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ mobileNo: mobileNO })
        })
        const res = await response.json()
        const { exist } = res;
        console.log(exist)
        if (exist) {
            alert("Mobile no is already registered")
            setIsOpen(true)
            return;
        } else {
            setupRecaptcha();
            setIsOpen(!isOpen);
            setFormSubmit(true)
            const phoneNumber = '+91' + mobileNO;
            const appVerifier = window.recaptchaVerifier;

            try {
                const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                setconfirmationResul(result)
                window.confirmationResult = confirmationResult
                setOTPSend(true)
                setFormSubmit(false)
            } catch (err) {
                console.log(err)
                alert(err)
                setIsOpen(!isOpen)

            } finally {
                setFormSubmit(false)
            }
        }


    };

    return (
        <>
            <div id="recaptcha-container" className="hidden"></div>
            {isOpen && (
                <div className="fixed top-20 md:top-36 left-1/2  transform -translate-x-1/2 w-4/5 sm:w-3/5 md:w-1/2 bg-white p-5 rounded-xl shadow-2xl z-40">
                    <div className={`flex justify-end `}>
                        <button disabled={OTPsend} onClick={() => {
                            setIsOpen(false);
                            setError({});
                            setFirstName("");
                            setLastName("")
                            setMobileNo("");
                            setLoanType("");
                            setLoanAmount("");
                            setRecaptchaerror("")
                            setValidmobileNo(true)
                            setotp("");
                            setOTPSend(false);

                        }}>
                            <X />
                        </button>
                    </div>

                    <h2 className="text-center text-xl md:text-3xl font-bold bg-gradient-to-r from-emerald-900 to-green-500 bg-clip-text text-transparent tracking-wide">
                        Loan Application Form
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col  mt-4 items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Enter your first name"
                            className="border-2 border-gray-300 w-4/5 p-2 md:w-4/6 lg:w-3/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-base font-medium"
                            value={firstName}
                            onChange={e => {
                                const onlyEnglishLetter = e.target.value.replace(/[^A-Za-z]/g, "")
                                setFirstName(onlyEnglishLetter)
                            }}
                        />
                        <div className="flex justify-start md:justify-center w-4/5 items-center gap-1">
                            {error.firstName && <CircleX color="red" size={15} />}
                            {error.firstName && <p className="text-red-500 text-sm w-4/5  md:w-3/5 items-center font-medium">{error.firstName}</p>}
                        </div>
                        <Input
                            type="text"
                            placeholder="Enter your last name"
                            className="border-2 border-gray-300 w-4/5 p-2 md:w-4/6 lg:w-3/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-base font-medium"
                            value={lastName}
                            onChange={e => {
                                const onlyEnglishLetter = e.target.value.replace(/[^A-Za-z]/g, "")
                                setLastName(onlyEnglishLetter)
                            }}
                        />
                        <div className="flex justify-start md:justify-center w-4/5 items-center gap-1">
                            {error.lastName && <CircleX color="red" size={15} />}
                            {error.lastName && <p className="text-red-500 text-sm w-4/5  md:w-3/5  font-medium">{error.lastName}</p>}
                        </div>

                        <Input
                            type="text"
                            placeholder="Enter mobile number"
                            className="border-2 border-gray-300 w-4/5 md:w-4/6 lg:w-3/6 p-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-base font-medium"
                            value={mobileNO}
                            onChange={e => {
                                setMobileNo(e.target.value.replace(/\D/g, ""))
                                if (e.target.value.length === 10) {
                                    setValidmobileNo(true)
                                }
                                else {
                                    setValidmobileNo(false)
                                }
                            }}

                        />
                        <div className="flex justify-start md:justify-center w-4/5 md:3/5 items-center gap-1">
                            {error.mobile && <CircleX color="red" size={15} />}
                            {error.mobile && <p className="text-red-500 text-sm w-4/5  md:w-3/5  font-medium ">{error.mobile}</p>}
                        </div>
                        <div className="flex justify-start md:justify-center w-4/5 items-center gap-1">
                            {!validMobileNo && <CircleX color="red" size={15} />}
                            {!validMobileNo && <p className="text-red-500 text-sm w-4/5  md:w-3/5  font-medium ">
                                Enter valid mobile no</p>}
                        </div>


                        <Select value={loanType} onValueChange={setLoanType}>
                            <SelectTrigger className="border-2 border-gray-300 w-4/5 md:w-4/6 lg:w-3/6 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-base font-medium">
                                <SelectValue placeholder="Select loan type" />
                            </SelectTrigger>
                            <SelectContent modal={false} className="text-base font-medium" position="popper">
                                <SelectGroup>
                                    <SelectLabel>Loans</SelectLabel>
                                    <SelectItem value="Personal">Personal Loan</SelectItem>
                                    <SelectItem value="Business">Business Loan</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="flex justify-start md:justify-center w-4/5 items-center gap-1">
                            {error.loan && <CircleX color="red" size={15} />}
                            {error.loan && <p className="text-red-500 text-sm w-4/5  md:w-3/5 items-center font-medium">{error.loan}</p>}
                        </div>
                        <Input
                            type="text"
                            placeholder="Enter loan amount"
                            className="border-2 !border-gray-300 w-4/5 md:w-4/6 lg:w-3/6 p-2 rounded-md focus:!outline-none focus:!ring-2 focus:!ring-green-400 text-base font-medium "
                            value={loanAmount}
                            onChange={e => setLoanAmount(e.target.value.replace(/\D/g, ""))}
                        />
                        <div className="flex justify-start md:justify-center w-4/5 items-center gap-1">
                            {error.amount && <CircleX color="red" size={15} />}
                            {error.amount && <p className="text-red-500 text-sm w-4/5  md:w-3/5 items-center font-medium">{error.amount}</p>}
                        </div>

                        <button disabled={OTPsend} type="submit" className="bg-gradient-to-r from-pink-600 to-red-500 text-white font-medium px-4 py-1.5 transition duration-200 rounded-sm hover:scale-105" >
                            Submit
                        </button>
                        {recaptchaerror && <p className="text-red-500 text-sm w-4/5 p-2 md:w-3/5 items-center font-medium">{recaptchaerror}</p>}
                    </form>
                </div>
            )}
            {formSubmit && <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
                <Spinner className="size-20" color="white" />
            </div>}

            {OTPsend && <div className="fixed flex flex-col items-center justify-center gap-3 h-52 w-4/5 md:w-2/5 sm:w-1/2 top-32 left-1/2 transform -translate-x-1/2 bg-white  rounded-xl shadow-2xl z-50">
                <div>
                    <h1 className="font-medium text-green-500">Vefify your modible number</h1>
                </div>
                <input
                    type="text"
                    maxlength={6}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={e => {
                        const onlyDigits = e.target.value.replace(/\D/g, "")
                        setotp(onlyDigits)
                    }}
                    className="w-4/5 sm:w-4/5 md:w-3/5  tracking-widest px-4 py-2 border-b-2 border-b-gray-300  focus:outline-none focus:border-b-green-500 text-center shadow-sm text-base font-medium"
                />
                {!validOTP && <p className="text-red-500 text-sm w-4/5 p-2 md:w-3/5 items-center font-medium">Enter valid OTP</p>}
                <button
                    onClick={verifyOtp}
                    disabled={otp.length !== 6}
                    className="bg-green-500 text-white font-medium px-3 py-2 rounded disabled:opacity-50"
                >
                    Verify OTP
                </button>
            </div>}

            {popup && isverified && (
                <div className="fixed flex justify-center items-center h-40 w-4/5 sm:w-3/5 md:w-1/2 top-32 left-1/2 transform -translate-x-1/2 bg-white p-5 rounded-xl shadow-2xl z-50">
                    <h1 className="text-center text-green-500 md:text-2xl font-medium">
                        {message}
                    </h1>
                </div>
            )}
        </>
    );
};

export default Apply;

