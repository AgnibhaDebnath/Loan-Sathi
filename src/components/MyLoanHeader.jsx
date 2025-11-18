import { Link } from "react-router-dom";
import { Handshake, LogOut, Menu } from "lucide-react";
import { useState } from "react";

const MyLoanHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <header className="bg-cyan-400 brightness-105 sm:px-8">
                <nav className="flex justify-between" >
                    <div className='text-3xl font-bold justify-between w-full flex items-center py-2 px-3  gap-2 '>
                        <div className="flex flex-row items-center gap-3">
                            <div className='h-12 w-12  rounded-full bg-white flex justify-center items-center'>
                                <  Handshake color='blue' />
                            </div>
                            <h1 className='font-[Poppins] text-white inline-block' >Loan Sathi</h1>
                        </div>
                        <ul className="hidden md:flex">
                            <div className="flex flex-row items-center gap-16 text-white sm:text-base font-medium text-sm">
                                <li className="hover:scale-105 transition duration-200"><Link>Loan Status</Link></li>
                                <li className="hover:scale-105 transition duration-200"><Link>EMI Section</Link></li>
                                <li>
                                    <div className="flex flex-row items-center gap-1 hover:scale-105">
                                        <LogOut />
                                        <Link>Logout</Link>
                                    </div>
                                </li>
                            </div>

                        </ul>
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} >
                                <Menu />
                            </button>
                        </div>

                    </div>
                </nav>

            </header>
            {
                isOpen &&
                <div className="absolute right-2 top-16 w-40  flex justify-center p-2 shadow-2xl bg-white rounded-md z-50 md:hidden">
                    <ul className="flex flex-col gap-4 text-black font-medium text-sm px-4 py-2">
                        <li className="hover:scale-105 transition duration-200"><Link>Loan status</Link></li>
                        <li className="hover:scale-105 transition duration-200"><Link>EMI section</Link></li>
                        <li className="flex flex-row items-center gap-1">
                            <LogOut color="red" />
                            <Link>Logout</Link>
                        </li>
                    </ul>
                </div>

            }

        </>
    )


}
export default MyLoanHeader;