import { ModelContext } from "@/Contaxt/ModelContext";
import { useContext, useState } from "react";
import { Input } from "./ui/input";
import { X, CircleX, CircleCheck, TriangleAlert, Eye, EyeOff } from "lucide-react";

import { Button } from "./ui/button";
import { toast, ToastContainer } from "react-toastify";

import { Spinner } from "@/components/ui/spinner"
// import { useNavigate } from "react-router-dom";

const AdminLogin = () => {


    const { isAuthOpen, setIsAuthOpen } = useContext(ModelContext)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState({ NameError: "", EmailError: "", PasswordError: "" })
    const [formSubmit, setFormSubmit] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [name, setName] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { authMode, setAuthMode } = useContext(ModelContext)
    const handleSubmit = async (e) => {
        e.PreventDefault()
        const BASE_URL = "https://loan-sathi.onrender.com";
        if (authMode == "Sign Up") {
            try {
                const res = await fetch(`${BASE_URL}/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ UserName: name.trim(), Email: email, Password: password, })
                })
            } catch (err) {
                console.log(err);
            }
        } else {
            try {


                const res = await fetch(`${BASE_URL}/login`, {
                    method: "POST"
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover />

            {isAuthOpen && <div className="fixed top-29 md:top-36 left-1/2  transform -translate-x-1/2 w-4/5 sm:w-3/5 lg:w-2/5 bg-white p-5 rounded-2xl shadow-2xl z-40">
                <div className="flex justify-end ">
                    <button className="cursor-pointer" onClick={() => {
                        setIsAuthOpen(false)
                        setError("")
                        setPassword("")
                        setEmail("")
                        setName("")
                    }}>
                        <X />
                    </button>
                </div>
                {authMode == "Sign Up" ? <div className="flex justify-center mb-2 ">
                    <h1 className="text-center font-bold text-2xl sm:text-2xl md:text-3xl">Sign Up</h1>
                </div> : <div className="flex justify-center mb-2 py-2">
                    <h1 className="text-center font-bold text-2xl sm:text-2xl md:text-3xl">Login</h1>
                </div>}
                <div className="py-2 flex justify-center mb-3   ">
                    <h1 className="text-gray-500 border-2 border-gray-500 px-10 min-[457px]:px-20 py-2 rounded-xl xl:px-32">All fields are required</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center gap-3 text-base font-medium">

                        {authMode == "Sign Up" && <Input type="text" placeholder="Name" className="max-[450px]:w-60 lg:w-4/6 w-4/5 md:w-3/5 rounded-2xl pl-5 border border-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-gray-50" value={name} onChange={e => {
                            const value = e.target.value
                            if (/^[A-Za-z\s]*$/.test(value)) {
                                setName(value)
                            }

                        }} />}
                        {(error.NameError) && <p className="text-red-500 text-sm"><span><CircleX size={20} className="inline mb-1 mr-1" /></span>{error.NameError}</p>}
                        <Input type="text" placeholder="Email (e.g. name@gmail.com)"
                            value={email}
                            onChange={e => {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                const Email = e.target.value
                                setEmail(Email)
                                if (emailRegex.test(Email)) {
                                    setError((prev) => ({ ...prev, EmailError: "" }));
                                } else {
                                    setError((prev) => ({ ...prev, EmailError: "Invalid email format" }))
                                }
                            }}

                            className="max-[450px]:w-60 lg:w-4/6 w-4/5 md:w-3/5 rounded-2xl pl-5 border border-gray-400 shadow-sm text-[0.9rem] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-gray-50" />
                        {(email && error.EmailError) && <p className="text-red-500 text-sm"><span><CircleX size={20} className="inline mb-1 mr-1" /></span>{error.EmailError}</p>}
                        <div className="relative max-[450px]:w-60 lg:w-4/6 w-4/5 md:w-3/5 ">
                            <Input placeholder="Password"
                                type={`${showPassword ? "text" : "password"}`}
                                onChange={e => {
                                    const password_value = e.target.value;
                                    setPassword(password_value)
                                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,}$/;

                                    if (/\s/.test(password_value)) {
                                        setError((prev) => ({
                                            ...prev,
                                            PasswordError: "Password cannot contain spaces"
                                        }));
                                        setValidPassword(false);
                                    }
                                    else if (!passwordRegex.test(password_value)) {
                                        setValidPassword(false);
                                    }
                                    else {
                                        setError(prev => ({ ...prev, PasswordError: "" }));
                                        setValidPassword(true);
                                    }
                                }}
                                value={password}
                                className=" rounded-2xl pl-5 border border-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-gray-50" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1.5 cursor-pointer">{showPassword ? <EyeOff size={22} /> : <Eye />}</button>
                        </div>
                        {(password && error.PasswordError) && <p className="text-red-500 text-sm"><span><CircleX size={20} className="inline mb-1 mr-1" /></span>{error.PasswordError}</p>}
                        {authMode == "Sign Up" && <ul className="text-xs mt-2 space-y-0.5">
                            <li className={password.length >= 8 ? "text-green-500" : "text-gray-400"}>
                                <CircleCheck className="inline mb-0.5" size={15} /> At least 8 characters
                            </li>
                            <li className={/[A-Z]/.test(password) ? "text-green-500" : "text-gray-400"}>
                                <CircleCheck className="inline mb-0.5" size={15} /> At least One uppercase letter
                            </li>
                            <li className={/[a-z]/.test(password) ? "text-green-500" : "text-gray-400"}>
                                <CircleCheck className="inline mb-0.5" size={15} /> At least One lowercase letter
                            </li>
                            <li className={/\d/.test(password) ? "text-green-500" : "text-gray-400"}>
                                <CircleCheck className="inline mb-0.5" size={15} /> At least One number
                            </li>
                            <li className={/[!@#$%^&*]/.test(password) ? "text-green-500" : "text-gray-400"}>
                                <CircleCheck className="inline mb-0.5" size={15} /> At least One special character
                            </li>
                        </ul>}

                        <Button onClick={() => setFormSubmit(true)} disabled={!(authMode == "Login" && email && validPassword) && !(email && name && validPassword)} className={`py-1 rounded-2xl px-9  text-white hover:scale-105 transition duration-200 cursor-pointer  ${authMode == "Sign Up" ? "bg-green-600 hover:bg-green-700 hover:scale-105" : "bg-gray-200 text-gray-700"}`}>{authMode == "Sign Up" ? "Sign Up" : "Login"}</Button>
                    </div>
                </form>
            </div>}
            {formSubmit && <div className="fixed inset-0  flex items-center justify-center bg-white/60 z-50">
                <Spinner className="size-20" color="black" />
            </div>}


        </>
    )
}
export default AdminLogin;