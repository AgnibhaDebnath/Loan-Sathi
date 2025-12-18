import { Link, Navigate } from "react-router-dom";
import { Handshake, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
const MyLoanHeader = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const handleSignout = async () => {
        try {
            await signOut(auth)
            navigate("/")
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <>
            <header className="fixed w-full top-0 left-0 right-0 z-50 bg-black backdrop-blur-2xl brightness-105 sm:px-8  border-b-2 border-gray-500 ">

                <nav className="flex justify-between">
                    <div className='text-3xl font-bold justify-between w-full flex items-center py-2 px-3 gap-2'>
                        <div className="flex flex-row items-center gap-3">
                            <div className='h-12 w-12 rounded-full bg-white flex justify-center items-center'>
                                <Handshake color='blue' />
                            </div>
                            <h1 className='font-[Poppins] text-white inline-block'>Loan Sathi</h1>
                        </div>
                        <ul className="hidden md:flex">
                            <div className="flex flex-row items-center gap-16 text-white sm:text-base font-medium text-sm">
                                <li className="hover:scale-105 transition duration-200"><Link to="/LoanStatusSection">Loan Status</Link></li>
                                <li className="hover:scale-105 transition duration-200"><Link to="/EMISection">EMI Section</Link></li>
                                <li>
                                    <button onClick={handleSignout} className="flex flex-row hover:scale-105 transition duration-200"><LogOut />Logout</button>
                                </li>
                            </div>
                        </ul>
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)}>
                                <Menu color="white" />
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* spacer so page content isn't hidden under the fixed header */}
            <div className="h-14" aria-hidden="true" />

            {isOpen && (
                <div className="fixed border border-gray-200 right-0 top-16 w-40 flex justify-center p-2 shadow-2xl bg-gray-600 rounded-xl z-50 md:hidden">
                    <ul className="flex flex-col gap-4 text-white font-medium text-sm px-4 py-2">
                        <li className="hover:scale-105 transition duration-200"><Link to="/LoanStatusSection">Loan status</Link></li>
                        <li className="hover:scale-105 transition duration-200"><Link to="/EMISection">EMI section</Link></li>
                        <li className="flex flex-row items-center gap-1">
                            <LogOut color="red" />
                            <button onClick={handleSignout}>Logout</button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )


}
export default MyLoanHeader;