import { ModelContext } from "@/Contaxt/ModelContext";
import { useContext, useState } from "react";
import { Input } from "./ui/input";
import { X, CircleX, CircleCheck } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
const AdminLogin = () => {
    const { LoginFormOpen, setLoginFormOpen } = useContext(ModelContext)
    const [mobileNo, setMobileNO] = useState("")
    const [mobileNoVerification, setMobileNoVerification] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordVerification, setPasswordVerification] = useState(false)
    const [passwordVerificationMessage, setPasswordVerificationMessage] = useState("")
    const [adminName, setAdminName] = useState("")
    const [error, setError] = useState({ adminNameError: "", mobileNoError: "", passwoedError: "" })
    const [validMobileNo, setValidMobileNo] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/verify-admin-mobileNo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ adminName, mobileNo })
            })
            const data = await res.json()
            const { success, message } = data
            setMobileNoVerification(success)
            setPasswordVerification(success)
            if (res.ok) {
                toast.success(message, {
                    position: "top-center",
                    theme: "light",
                    ariaLabel: 5000
                })
            }
            else {
                toast.error(message, {
                    position: "top-center",
                    theme: "light",
                    ariaLabel: 5000
                })
            }
        } catch (err) {
            console.log(err)
        }
        // try {

        //     const res = await fetch("http://localhost:3000/verify-password", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Accept": "application/json"
        //         },
        //         body: JSON.stringify({ password, adminName })

        //     })
        //     const data = await res.json()
        //     const { success, message } = data
        //     setPasswordVerification(success)

        //     setPasswordVerificationMessage(message)
        //     setError("")
        //     console.log(success)
        // } catch (err) {
        //     console.log(err)
        // }
    }

    return (
        <>
            {LoginFormOpen && <div className="fixed top-20 md:top-36 left-1/2  transform -translate-x-1/2 w-4/5 sm:w-3/5 lg:w-2/5 bg-white p-5 rounded-xl shadow-2xl z-40">
                <div className="flex justify-end ">
                    <button onClick={() => {
                        setLoginFormOpen(!LoginFormOpen)
                        setError("")
                        setPasswordVerification(false)
                        setMobileNoVerification(false)
                        setMobileNO("")
                        setPassword("")
                        setAdminName("")
                    }}>
                        <X />
                    </button>
                </div>
                <div className="flex justify-center my-2 py-2">
                    <h1 className="text-center font-bold text-xl sm:text-2xl md:text-3xl">Admin login from</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center gap-2 text-base font-medium">
                        {!mobileNoVerification && <Input placeholder="Admin name"
                            onChange={e => {
                                const onlyLetterAndSpace = e.target.value.replace(/[^a-zA-Z\s]/g, "")
                                setAdminName(onlyLetterAndSpace)
                                if (!onlyLetterAndSpace) {
                                    setError(prev => ({ ...prev, adminNameError: "Admin name is required" }))
                                } else {
                                    setError(prev => ({ ...prev, adminNameError: "" }))
                                }
                            }}
                            value={adminName}
                            className="lg:w-4/6 w-4/5 md:w-3/5" />}
                        {error.adminNameError && <p className="text-red-500"><span><CircleX size={20} className="inline mb-1" /></span>{error.adminNameError}</p>}

                        {!mobileNoVerification && <Input placeholder="Mobile no"
                            type="text"
                            onChange={e => {
                                const onlyDigits = e.target.value.replace(/\D/g, "")
                                setMobileNO(onlyDigits)
                                if (!onlyDigits) {
                                    setError(prev => ({ ...prev, mobileNoError: "Mobile no is required" }))
                                }
                                else if (onlyDigits.length !== 10) {
                                    setError(prev => ({ ...prev, mobileNoError: "Mobile no must be exact 10 digits" }))
                                    setValidMobileNo(false)
                                }
                                else {
                                    setError(prev => ({ ...prev, mobileNoError: "" }))
                                    setValidMobileNo(true)
                                }
                            }}
                            value={mobileNo}
                            className="lg:w-4/6 w-4/5 md:w-3/5" />}
                        {error.mobileNoError && <p className="text-red-500"><span><CircleX size={20} className="inline mb-1" /></span>{error.mobileNoError}</p>}

                        {passwordVerification && <Input placeholder=" Password"
                            type="text"
                            onChange={e => {
                                const password = e.target.value;
                                setPassword(password)
                                if (!password) {
                                    setError(prev => ({ ...prev, passwoedError: "Password is required" }))
                                } else {
                                    setError(prev => ({ ...prev, passwoedError: "" }))
                                }

                            }}
                            value={password}
                            className="lg:w-4/6 w-4/5 md:w-3/5" />}
                        {error.passwoedError && <p className="text-red-500"><span><CircleX size={20} className="inline mb-1" /></span>{error.passwoedError}</p>}

                        {passwordVerification && <button className="py-1 rounded-sm px-3 bg-gradient-to-r text-white hover:scale-105 from-pink-600 to-red-500 transition duration-200">Verify password</button>}

                        {!mobileNoVerification && <Button disabled={!(adminName && mobileNo) || !validMobileNo} className="py-1 rounded-sm px-3 bg-gradient-to-r text-white hover:scale-105 from-pink-600 to-red-500 transition duration-200">Verify mobile no</Button>}
                    </div>
                </form>
            </div>}

        </>
    )
}
export default AdminLogin;