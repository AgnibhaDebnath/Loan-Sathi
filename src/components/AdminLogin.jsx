import { ModelContext } from "@/Contaxt/ModelContext";
import { useContext, useState } from "react";
import { Input } from "./ui/input";
import { X, CircleX, CircleCheck } from "lucide-react";
const AdminLogin = () => {
    const { LoginFormOpen, setLoginFormOpen } = useContext(ModelContext)
    const [mobileNo, setMobileNO] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerification, setPasswordVerification] = useState(null)
    const [passwordVerificationMessage, setPasswordVerificationMessage] = useState("")
    const [adminName, setAdminName] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = {}
        if (!password || !adminName) {
            password ? error.passwordError = "" : error.passwordError = "Password is required"
            adminName ? error.nameError = "" : error.nameError = "Admin name is required"
            setError(error)
            return

        }
        else {
            const res = await fetch("http://localhost:3000/verify-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ password, adminName })

            })
            const data = await res.json()
            const { success, message } = data
            setPasswordVerification(success)

            setPasswordVerificationMessage(message)
            setError("")
            console.log(success)
        }
    }

    return (
        <>
            {LoginFormOpen && <div className="fixed top-20 md:top-36 left-1/2  transform -translate-x-1/2 w-4/5 sm:w-3/5 lg:w-2/5 bg-white p-5 rounded-xl shadow-2xl z-40">
                <div className="flex justify-end ">
                    <button onClick={() => {
                        setLoginFormOpen(!LoginFormOpen)
                        setError("")
                        setPasswordVerification(null)
                        setPasswordVerificationMessage("")
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
                        {error && <div className="bg-red-50 w-11/12 sm:w-4/5 md:w-3/5 lg:w-4/6  border-2  border-red-700 px-1 shadow-md shadow-red-200 mb-3">
                            {error.passwordError && <p className="text-red-700 py-1">
                                <CircleX className="inline" /> {error.passwordError}
                            </p>}
                            {error.nameError && <p className="text-red-700 py-1">
                                <CircleX className="inline" /> {error.nameError}
                            </p>}
                        </div>}
                        {!passwordVerification && <Input placeholder="Enter your name" onChange={e => setAdminName(e.target.value)} value={adminName} className="lg:w-4/6 w-4/5 md:w-3/5" />}
                        {!passwordVerification && <Input placeholder="Enter password" onChange={e => setPassword(e.target.value)} value={password} className="lg:w-4/6 w-4/5 md:w-3/5" />}


                        {
                            passwordVerification === true && <>

                                <p className="text-green-600 brightness-105 text-lg"><CircleCheck className="inline text-green-500" size={30} />{passwordVerificationMessage}</p></>
                        }
                        {
                            passwordVerification === false && <>

                                <p className="text-red-500"> <CircleX className="inline text-red-500" />{passwordVerificationMessage}</p></>
                        }
                        {/* {
                            passwordVerification === null && <>

                                <p className="">proccessing...</p></>
                        } */}
                        {passwordVerification && <Input onChange={e => setMobileNO(e.target.value.replace(/\D/g, ""))}

                            value={mobileNo} placeholder="Enter mobile no" className="lg:w-4/6 w-4/5 md:w-3/5 " />}
                        {!passwordVerification && <button className="py-1 rounded-sm px-3 bg-gradient-to-r text-white hover:scale-105 from-pink-600 to-red-500 transition duration-200">Verify password</button>}
                        {passwordVerification && <button className="py-1 rounded-sm px-3 bg-gradient-to-r text-white hover:scale-105 from-pink-600 to-red-500 transition duration-200">Verify mobile no</button>}
                    </div>
                </form>
            </div>}

        </>
    )
}
export default AdminLogin;