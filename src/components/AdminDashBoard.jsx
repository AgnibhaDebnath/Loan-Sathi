
import { Users, IndianRupee } from 'lucide-react';
import useStore from "../Store/store"
const AdminDashboard = () => {


    const { TotalLoanAmount, TotalEMIAmount, TotalActiveBorrower, EMIPending, ApplicationDue } = useStore()
    const CardData = [
        { label: "Total Loan amount", value: TotalLoanAmount },
        { label: "Total EMI received", value: TotalEMIAmount },
        { label: "Total active borrower", value: TotalActiveBorrower },
        { label: "EMI pending this month", value: EMIPending },
        { label: "Application due", value: ApplicationDue }

    ]
    return (
        <>
            <div className="flex brightness-110 justify-center bg-gradient-to-r from-yellow-300 via-amber-600 to-yellow-300 items-center py-1">
                <h1 className="text-center text-5xl text-white ">Admin Dashboard</h1>
            </div>
            <div className='bg-gradient-to-r from-cyan-300  to-teal-300 mx-5 shadow-xl my-7 rounded-2xl py-10 flex flex-wrap items-center justify-center  gap-4 brightness-105'>

                {CardData.map((item, index) =>
                    <div key={index} className="  font-medium text-[1.1rem]  shadow-xl py-2 px-5 h-24 w-80 hover:scale-105 transition duration-200 my-3 bg-white   ">
                        <div className='flex justify-center'>
                            <h1 className='text-center'>{item.label}</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center">

                            {item.value}
                            {(index == 0 || index == 1) ? <IndianRupee size={15} /> : null
                            }

                        </div>
                    </div>
                )}


            </div>


        </>
    )
}
export default AdminDashboard;