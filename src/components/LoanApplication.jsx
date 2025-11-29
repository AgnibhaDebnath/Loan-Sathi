import { useContext, useEffect, useState } from "react";
import { Loader, Check, X, Phone, CircleX } from "lucide-react";
import { ModelContext } from "@/Contaxt/ModelContext";
const LoanApplications = () => {
    const [loanApplications, setLoanApplications] = useState([]);
    const { popUp, setPopUp } = useContext(ModelContext)
    const [message, setmessage] = useState(null)
    const [act, setAct] = useState(null)
    const [number, setnumber] = useState(null)
    const [successfullMessage, setSuccessfullMessage] = useState(null)
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


    const updateStatus = async () => {
        if (act && popUp) {
            try {
                const res = await fetch("http://localhost:3000/update-status", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        number,
                        status: message, // "approve" or "reject"
                    }),
                });
                const data = await res.json()
                const { successMessage } = data
                console.log(successMessage)
                setAct(null); // Reset after processing

                setPopUp(false);// Close popup

                setSuccessfullMessage(successMessage);
                setTimeout(() => {
                    setSuccessfullMessage(null);
                }, 5000);
            } catch (err) {
                setPopUp(true);
                console.error("Update error:", err);
            }


        } else {
            setPopUp(false)
            setAct(null)
            setmessage(null)
            return
        }


    };
    useEffect(() => {
        if (act !== null) {
            updateStatus();
        }
    }, [act]);

    return (
        <>


            <div className="flex flex-col items-center my-4">
                <div className="p-5  rounded-xl mx-4 md:w-3/4 w-11/12 border-gray-400 border-2">
                    <div className="flex  flex-col items-center my-2">
                        <h2 className=" text-xl md:text-3xl font-bold mb-4 tracking-wide inline-block text-center bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text brightness-110 "><span className="text-lg animate-pulse text-red-500 pb-1">🔴</span>Live Loan Applications</h2>
                        <input type="text" placeholder="Search by mobile no" className="w-full sm:w-2/4 p-2 rounded-md border border-gray-300" />
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
                                            <td className="border-r  border-gray-300 p-2 text-left text-base font-medium"><span className="block">
                                                {loan.first_name} {loan.last_name}
                                            </span>
                                                <span className="block"><Phone className="inline-block" />{loan.mobile_no}</span>
                                            </td>
                                            <td className="border-r border-gray-300 p-2 text-left text-base font-medium">{loan.loan_type}</td>
                                            <td className="border-r border-gray-300 p-2 text-left text-base font-medium">{loan.loan_amount}</td>
                                            <td className="border-r border-gray-300 p-2 text-left text-base font-medium">
                                                {(loan.loan_status == "pending") && (<><Loader className="inline-block animate-spin" color="yellow" />  <span className="text-yellow-400">{loan.loan_status}</span></>)}

                                                {(loan.loan_status == "approved") && (<>  <span className="text-green-500"><Check className="inline" />Approved on<span className="ml-1">:</span><span className="text-blue-500 ml-1">{loan.decision_at ? new Date(loan.decision_at).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}</span></span></>)}

                                                {(loan.loan_status == "rejected") && (<>  <span className="text-red-500">
                                                    <CircleX className="inline text-red-500" />Rejected on<span className="ml-1">:</span><span className="text-blue-500 ml-1">{loan.decision_at ? new Date(loan.decision_at).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}</span></span></>)}
                                                <br />

                                                Application date<span className="mx-1">:</span> {loan.submitted_at ? new Date(loan.submitted_at).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}
                                            </td>
                                            <td className="p-2">
                                                {loan.loan_status == "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                setmessage("approved")
                                                                setPopUp(true)
                                                                setnumber(loan.mobile_no)
                                                            }}
                                                            name="approve"
                                                            className="bg-green-500 my-2 text-white font-medium px-2 py-1.5 rounded-lg mr-2"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setmessage("rejected")
                                                                setPopUp(true)
                                                                setnumber(loan.mobile_no)
                                                            }}
                                                            name="reject"
                                                            className="bg-red-500 text-white  font-medium px-4 py-1.5 rounded-lg"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {loan.loan_status === "approved" &&
                                                    (<button
                                                        // onClick={() => approveLoan(loan.id)}
                                                        className="bg-gray-700 my-2 text-green-500 font-medium px-3 py-2 rounded-full mr-2 cursor-text flex justify-center items-center "
                                                    >
                                                        <Check className="block" strokeWidth={3} />
                                                        <span className="block">Approved</span>

                                                    </button>)
                                                }
                                                {loan.loan_status === "rejected" &&
                                                    (<button
                                                        // onClick={() => approveLoan(loan.id)}
                                                        className="bg-gray-700 my-2 text-red-500 rounded-full font-medium px-3 py-2  mr-2 flex justify-center"
                                                    >
                                                        <CircleX className="block" strokeWidth={3} />
                                                        <span className="block">Rejected</span>
                                                    </button>)
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
            {popUp && (
                <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50">



                    <div className="mt-10 bg-white border-2 border-gray-400 p-4 rounded-lg shadow-lg font-medium">
                        <div className="flex justify-end">
                            <button onClick={() => setPopUp(false)}><X /></button>
                        </div>

                        <h1>
                            Do you want to  {message == "approved" ? <span className="text-green-500">approve</span> : <span className="text-red-500">reject</span>} the application?
                        </h1>
                        <div className="mt-4 flex justify-center space-x-10">
                            <button onClick={() => {
                                setAct(true)

                            }} className="px-8 py-2 bg-green-600 text-white rounded">Yes</button>
                            <button onClick={() => {
                                setAct(false)

                            }} className="px-8 py-2 bg-red-600 text-white rounded">No</button>
                        </div>
                    </div>
                </div>
            )}
            {successfullMessage && (
                <div className="fixed inset-0 flex justify-center items-start z-50 ">
                    <div className="w-full sm:w-2/4 bg-white border border-gray-300 p-6 rounded-xl shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100 py-8">
                        <div className="text-center">
                            <h1 className="text-green-600 font-semibold text-xl">{successfullMessage}</h1>
                        </div>
                    </div>
                </div>

            )

            }

        </>
    )
}
export default LoanApplications;