import { useEffect, useState } from "react";
import { Loader, Check } from "lucide-react";
const LoanApplications = () => {
    const [loanApplications, setLoanApplications] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/loan-application", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json()) // ✅ return parsed JSON
            .then(data => {
                console.log("Fetched loan data:", data); // ✅ should show actual data
                const { LoanDetails } = data;
                console.log(LoanDetails)
                setLoanApplications(LoanDetails)
            })
            .catch(err => {
                console.error("Fetch error:", err);
            });
    }, []);
    return (
        <>


            <div className="flex flex-col items-center my-4">
                <div className="p-5  rounded-xl mx-4 md:w-3/4 w-11/12 border-gray-400 border-2">
                    <div className="flex  flex-col items-center my-2">
                        <h2 className=" text-xl md:text-3xl font-bold mb-4 tracking-wide inline-block text-center bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text brightness-110 "><span className="text-lg animate-pulse text-red-500 pb-1">🔴</span>Live Loan Applications</h2>
                        <input type="text" placeholder="Search name" className="w-1/3 p-2 rounded-md border border-gray-300" />
                    </div>
                    <div>
                        <div className="overflow-x-auto w-full">
                            <table className=" border-collapse border-2 border-green-200 min-w-[800px] w-full ">
                                <thead className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white brightness-125">
                                    <tr  >
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">Name</th>
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">Type</th>
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">Amount</th>
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">Status</th>
                                        <th className="border-r border-gray-300 p-2 text-lefttext-base font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...loanApplications].reverse().map((loan) => (
                                        <tr key={loan.id} className="border text-white">
                                            <td className="border-r border-gray-300 p-2 text-left text-base font-medium">{loan.first_name} {loan.last_name}</td>
                                            <td className="border-r border-gray-300 p-2 text-left text-base font-medium">{loan.loan_type}</td>
                                            <td className="border-r border-gray-300 p-2 text-left text-base font-medium">{loan.loan_amount}</td>
                                            <td className="border-r border-gray-300 p-2 text-left text-base font-medium">
                                                {(loan.loan_status == "pending") && (<><Loader className="inline-block animate-spin" color="yellow" />  <span className="text-yellow-400">{loan.loan_status}</span></>)}
                                                <br />
                                                Application date: {loan.submitted_at ? new Date(loan.submitted_at).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}
                                            </td>
                                            <td className="p-2">
                                                {loan.loan_status == "pending" && (
                                                    <>
                                                        <button
                                                            // onClick={() => approveLoan(loan.id)}
                                                            className="bg-green-500 my-2 text-white font-medium px-2 py-1 rounded mr-2"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            // onClick={() => rejectLoan(loan.id)}
                                                            className="bg-red-500 text-white  font-medium px-2 py-1 rounded"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
export default LoanApplications;