
import { Loader, IndianRupee, Menu, Handshake } from 'lucide-react';
import useStore from "../Store/store"

import { Link } from 'react-router-dom';
const AdminDashboard = () => {


    const { TotalLoanAmount, TotalEMIAmount, TotalActiveBorrowers, EMIPending, pendingCount, approvedCount, rejectedCount } = useStore()
    const CardData = [
        { label: "Total Loan amount", icon: "💰", value: TotalLoanAmount },
        { label: "Total EMI received", icon: "💰", value: TotalEMIAmount },
        { label: "Total active borrowers", icon: "👥", value: TotalActiveBorrowers },
        { label: "EMI pending this month", icon: "⏳", value: EMIPending },
        { label: "Application", icon: "📄", value: [pendingCount, approvedCount, rejectedCount] }

    ]

    return (
        <>
            <header>
                <header className="fixed w-full top-0 left-0 right-0 z-50 bg-black/75 backdrop-blur-2xl brightness-105 sm:px-8  border-b-2 border-gray-500 ">
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
                                    <li className="hover:scale-105 transition duration-200 hover:text-pink-500"><Link to="/admin/admin-profile ">Admin profile</Link></li>
                                    <li className="hover:scale-105 transition duration-200 hover:text-pink-500"><Link to="/admin/loans">EMI Section</Link></li>
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
            </header>




            <div className='pt-16'>
                <div className='bg-gradient-to-br from-cyan-600  to-teal-200 mx-5 shadow-xl my-7 rounded-2xl py-10 flex flex-wrap items-center justify-center  gap-4 brightness-105 '>

                    {CardData.map((item, index) =>
                        <div key={index} className="  font-medium text-[1.1rem]  shadow-xl py-2 px-5 h-28 w-72 hover:scale-105 transition duration-200 my-3 bg-white  hover:shadow-2xl drop-shadow backdrop-blur-sm bg-white/30 border border-white/20">
                            <div className='flex justify-center bg-cyan-500 p-1 rounded-full items-center brightness-125'>
                                <h1 className='text-center '><span className="inline-block text-2xl ">{item.icon}</span>{item.label}</h1>
                            </div>
                            <div className="flex flex-row items-center justify-center">

                                {item.label === "Application" ? <>
                                    <div className='grid grid-cols-2 '>
                                        <p className=''><Loader className="inline text-yellow-300 animate-spin " />pending:<span className='ml-1'>{item.value[0]}</span></p>
                                        <p className=''>✅approved:<span className='ml-1'>{item.value[1]}</span></p>
                                        <p className=''>❌rejected:<span className='ml-1'>{item.value[2]}</span></p>
                                    </div>

                                </> : item.value}
                                {(index == 0 || index == 1) ? <IndianRupee size={15} /> : null
                                }

                            </div>
                        </div>
                    )}


                </div>
            </div>



        </>
    )
}
export default AdminDashboard;