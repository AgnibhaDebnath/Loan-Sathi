
import { Users, IndianRupee } from 'lucide-react';
import useStore from "../Store/store"
const AdminDashboard = () => {


    const { TotalLoanAmount, TotalEMIAmount, TotalActiveBorrowers, EMIPending, ApplicationDue } = useStore()
    const CardData = [
        { label: "Total Loan amount", icon: "💰", value: TotalLoanAmount },
        { label: "Total EMI received", icon: "💰", value: TotalEMIAmount },
        { label: "Total active borrowers", icon: "👥", value: TotalActiveBorrowers },
        { label: "EMI pending this month", icon: "⏳", value: EMIPending },
        { label: "Application due", icon: "📄", value: ApplicationDue }

    ]
    return (
        <>
            <div className="flex brightness-110 justify-center font-bold items-center py-1">
                <h1 className="text-center text-5xl text-white ">Admin Dashboard</h1>
            </div>
            <div className='bg-gradient-to-br from-cyan-600  to-teal-200 mx-5 shadow-xl my-7 rounded-2xl py-10 flex flex-wrap items-center justify-center  gap-4 brightness-105'>

                {CardData.map((item, index) =>
                    <div key={index} className="  font-medium text-[1.1rem]  shadow-xl py-2 px-5 h-24 w-72 hover:scale-105 transition duration-200 my-3 bg-white  hover:shadow-2xl drop-shadow backdrop-blur-sm bg-white/30 border border-white/20">
                        <div className='flex justify-center'>
                            <h1 className='text-center'><spam className="inline-block text-2xl">{item.icon}</spam>{item.label}</h1>
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