import { BriefcaseBusiness } from 'lucide-react'
import { Wallet } from "lucide-react";
import { ArrowRight } from "lucide-react"
import personalLoanImage from "../assets/personal.jpg"
import BusinessLoanImage from "../assets/Business.jpg"
import { ModelContext } from '../Contaxt/ModelContext';
import { useContext } from 'react';
const LoanServices = () => {
    const services = [
        {
            id: 1,
            title: "Personal Loan",
            description: "Quick, secure, and affordable loans for your personal needs.",
            interestRate: "16-25%",
            tenure: "12 - 36 months",
            amount: "₹10,000 - ₹1,00,000",
            imagURL: personalLoanImage
        },
        {
            id: 2,
            title: "Business Loan",
            description: "Empowering small businesses with fast and reliable  loans.",
            interestRate: "12-20%",
            tenure: "6 - 48 months",
            amount: "₹25,000 - ₹5,00,000",
            imagURL: BusinessLoanImage
        }

    ]
    const { isOpen, setIsOpen } = useContext(ModelContext)
    return (
        <>
            <div className="py-5 flex justify-center bg-gradient-to-r from-white via-sky-500 to-white">
                <h1 className="md:text-5xl sm:text-3xl text-2xl font-bold  
                 bg-gradient-to-r from-white via-pink-500 animate-shine [background-size:200%_auto] to-white bg-clip-text text-transparent 
                 tracking-wide inline-block mx-auto ">Loan Services</h1>
            </div>
            <div className="flex my-2 flex-row py-20 flex-wrap justify-evenly mb-4 bg-gradient-to-r from-white via-sky-500 to-white mx-4 rounded-lg ">
                {services.map(item =>
                    <div key={item.id} className="bg-white shadow-2xl  py-4 px-4 rounded-2xl my-3 border-pink-200 border-2">
                        <div className="flex justify-center flex-row items-center ">
                            {item.id == 1 ? <Wallet className='text-green-600 ' /> : <BriefcaseBusiness className='text-green-600 ' />}
                            <h1 className="text-2xl font-bold text-green-500 pl-3">{item.title}</h1>


                        </div>
                        <div className="flex justify-center flex-row px-3  ">
                            <ul className='list-disc'>
                                <li className="text-base text-gray-500 ">{item.description}</li>
                                <li className='text-base text-gray-500'>Interest Rate: <span className='font-semibold bg-gradient-to-r from-red-600 via-red-300 to-red-600 animate-shine [background-size:200%_auto] text-transparent bg-clip-text'>{item.interestRate} per year</span></li>
                                <li className='text-base text-gray-500 font-semibold'>Lone tenure: {item.tenure}</li>
                                <li className='text-base text-gray-500 font-semibold'>Amount: {item.amount}</li>
                            </ul>

                        </div>
                        <div className='overflow-hidden  bg-gray-50 flex justify-center py-2'>
                            <img src={item.imagURL} className='h-40 w-44 object-cover rounded-md' alt="" />
                        </div>
                        <div className='flex justify-center text-white py-2'>

                            <button key={item.id} onClick={() => {
                                if (isOpen) {
                                    return
                                }
                                else {
                                    setIsOpen(!isOpen)
                                }
                            }} className=" bg-green-600 px-4 py-2 rounded-md hover:bg-green-700  gap-2 font-medium flex flex-row items-center hover:scale-105 transition duration-200">
                                Apply Now
                                <ArrowRight size={20} />
                            </button>
                        </div>


                    </div>
                )}
            </div>
        </>
    )
}
export default LoanServices;