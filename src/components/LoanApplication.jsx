import { useContext, useEffect, useState } from "react";
import { Loader, Check, X, Phone, CircleX } from "lucide-react";
import { ModelContext } from "@/Contaxt/ModelContext";
import { Select, SelectGroup, SelectValue, SelectContent, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"
import { Button } from "./ui/button";
import useStore from "../Store/store"

const LoanApplications = () => {
    const [loanApplications, setLoanApplications] = useState([]);
    const { popUp, setPopUp } = useContext(ModelContext)
    const [message, setmessage] = useState(null)
    const [act, setAct] = useState(null)
    const [number, setnumber] = useState(null)
    const [successfullMessage, setSuccessfullMessage] = useState(null)
    const [statusFilter, setStatusFilter] = useState("")
    const [loanTypeFilter, setLoanTypeFilter] = useState("")


    const calculateCounts = (loanApplication) => {
        const pending = loanApplication.filter(l => l.loan_status === "pending").length
        const approved = loanApplication.filter(l => l.loan_status === "approved").length
        const rejected = loanApplication.filter(l => l.loan_status === "rejected").length
        useStore.getState().setApplicationCount({
            pending,
            approved,
            rejected
        })
    }
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
                calculateCounts(LoanDetails)
            })
            .catch(err => {
                console.error("Fetch error:", err);
            });
    }, []);


    const filteredLoanApplications = loanApplications.filter(l =>
        statusFilter
            ? statusFilter.toLowerCase() === l.loan_status.toLowerCase()
            : true
    )
        .filter(l => loanTypeFilter ? loanTypeFilter === l.loan_type : true)
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

                const updatedList = await fetch("http://localhost:3000/loan-application", {
                    method: "GET"
                })
                const UpdatedLoanData = await updatedList.json()
                const { LoanDetails } = UpdatedLoanData;
                // ✅ 2. Update your table state
                setLoanApplications(LoanDetails);

                // ✅ 3. Recalculate counts for pending/approved/rejected
                calculateCounts(LoanDetails);

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


            <div className="flex flex-col items-center mt-3 pb-3">
                <div className="p-5  rounded-3xl mx-4 md:w-3/4 w-11/12 border-gray-400 border-2">
                    <div className="flex flex-col items-center my-2">
                        <h2 className=" text-xl md:text-3xl font-bold mb-4 tracking-wide inline-block text-center bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text brightness-110 "><span className="text-3xl animate-pulse text-red-500 pb-1">🔴</span>Live Loan Applications</h2>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12
               font-medium rounded-xl border border-white/30
               bg-white/10 backdrop-blur-md text-white
               hover:bg-white/20 
               transition-all duration-200 outline-none shadow-sm ">
                                <SelectValue placeholder="Loan status" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border border-white/20 bg-black/80 backdrop-blur-md shadow-lg ">
                                <SelectGroup>
                                    <SelectLabel className="font-medium text-gray-300 px-2 py-1 ">Select loan status</SelectLabel>
                                    <SelectItem value="pending" className="font-medium text-yellow-400 hover:bg-yellow-400/10 rounded-md px-2 py-2 transition-colors">pending</SelectItem>
                                    <SelectItem value="approved" className="font-medium text-green-500 hover:bg-green-500/10 rounded-md px-2 py-2 transition-colors">Approved</SelectItem>
                                    <SelectItem value="rejected" className="font-medium text-red-500 hover:bg-red-500/10 rounded-md px-2 py-2 transition-colors">Rejected</SelectItem>
                                </SelectGroup>
                            </SelectContent>

                        </Select>
                        <Button onClick={() => setStatusFilter("")} className="bg-gradient-to-r from-yellow-400 to-red-500 my-2 px-6">Reset Status filter</Button>
                        <Select value={loanTypeFilter} onValueChange={setLoanTypeFilter}>
                            <SelectTrigger className="w-4/5 sm:w-7/12 md:w-7/12 lg:w-5/12
               font-medium rounded-xl border border-white/30
               bg-white/10 backdrop-blur-md text-white
               hover:bg-white/20 focus:ring-2
               transition-all duration-200 outline-none shadow-sm ">
                                <SelectValue placeholder="Loan type" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border border-white/20 bg-black/80 backdrop-blur-md shadow-lg ">
                                <SelectGroup>
                                    <SelectLabel className="font-medium text-white ">Select loan type</SelectLabel>
                                    <SelectItem value="Personal" className="font-medium text-white">Parsonal</SelectItem>
                                    <SelectItem value="Business" className="font-medium text-white">Business</SelectItem>

                                </SelectGroup>
                            </SelectContent>

                        </Select>
                        <Button onClick={() => setLoanTypeFilter("")} className="bg-gradient-to-r from-pink-400 to-red-500 mt-2 hover:scale-105 transition duration-200">Reset loan type filter</Button>
                    </div >
                    <div>
                        <div className="overflow-x-auto w-full">
                            <table className=" border-collapse border-2 border-green-200 min-w-[800px] w-full ">
                                <thead className="bg-gradient-to-r from-teal-500 to-cyan-500  brightness-125">
                                    <tr  >
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">Name</th>
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">Type</th>
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">Amount</th>
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">Status</th>
                                        <th className="border-r border-gray-300 p-2 text-lefttext-base font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        filteredLoanApplications.length === 0 ? (
                                            <tr>
                                                <td className="text-white p-4 text-center" colSpan={5}>
                                                    No loan application found
                                                </td>
                                            </tr>
                                        ) : [...filteredLoanApplications].reverse().map((loan) => (

                                            <tr key={loan.id} className="border text-white">
                                                <td className="border-r  border-gray-300 p-2 text-left text-base font-medium"><span className="block">
                                                    {loan.first_name} {loan.last_name}
                                                </span>
                                                    <span className="block"><Phone className="inline-block" />{loan.mobile_no}</span>
                                                </td>
                                                <td className="border-r border-gray-300 p-2 text-left text-base font-medium">{loan.loan_type}</td>
                                                <td className="border-r border-gray-300 p-2 text-left text-base font-medium">{loan.loan_amount}</td>
                                                <td className="border-r border-gray-300 p-2 text-left text-base font-medium">
                                                    {(loan.loan_status == "pending") && (<><Loader className="inline-block animate-spin text-yellow-300 brightness-150" />  <span className="text-yellow-400">{loan.loan_status}</span></>)}

                                                    {(loan.loan_status == "approved") && (<>  <span className="text-green-500"><Check className="inline" />Approved on<span className="ml-1">:</span><span className="text-blue-500 ml-1">{loan.decision_at ? new Date(loan.decision_at).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}</span></span></>)}

                                                    {(loan.loan_status == "rejected") && (<>  <span className="text-red-500">
                                                        <CircleX className="inline text-red-500 mx-1" />Rejected on<span className="ml-1">:</span><span className="text-blue-500 ml-1">{loan.decision_at ? new Date(loan.decision_at).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}</span></span></>)}
                                                    <br />

                                                    Application date<span className="mx-1">:</span> {loan.submitted_at ? new Date(loan.submitted_at).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}
                                                </td>
                                                <td className="p-2">
                                                    {loan.loan_status == "pending" && (
                                                        <>
                                                            <Button
                                                                onClick={() => {
                                                                    setmessage("approved")
                                                                    setPopUp(true)
                                                                    setnumber(loan.mobile_no)
                                                                }}
                                                                name="approve"
                                                                className="bg-gradient-to-r from-emerald-500 to-green-500 my-2 text-white font-medium px-2 py-1.5 rounded-md mr-2 hover:scale-105 transition duration-150"
                                                            >
                                                                <Check className="inline" strokeWidth={3} />
                                                                Approve
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    setmessage("rejected")
                                                                    setPopUp(true)
                                                                    setnumber(loan.mobile_no)
                                                                }}
                                                                name="reject"
                                                                className="bg-gradient-to-r from-yellow-400 to-red-500 text-white  font-medium px-4 py-1.5 rounded-md hover:scale-105 transition duration-150"
                                                            >
                                                                <CircleX className="inline" strokeWidth={3} />
                                                                Reject
                                                            </Button>
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
                                                            className="bg-gray-700 my-2 text-red-500 rounded-full font-medium px-3 py-2  mr-2 flex justify-center cursor-text"
                                                        >
                                                            <CircleX className="block" strokeWidth={3} />
                                                            <span className="block mx-1 ">Rejected</span>
                                                        </button>)
                                                    }
                                                </td>
                                            </tr>



                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div >
            </div >
            {popUp && (
                <div className="fixed  inset-0  bg-black bg-opacity-50 flex justify-center items-start z-50">



                    <div className="mt-10 border-2 border-gray-400 p-2 rounded-xl shadow-lg font-medium bg-black">
                        <div className="flex justify-end">
                            <button onClick={() => setPopUp(false)}><X color="white" /></button>
                        </div>

                        <h1 className="px-5  text-white">
                            Do you want to  {message == "approved" ? <span className="text-green-500">approve</span> : <span className="text-red-500 ">reject</span>} the application?
                        </h1>
                        <div className="mt-4 flex justify-center space-x-10 p-7">
                            <Button onClick={() => {
                                setAct(true)

                            }} className="px-8 py-2 hover:scale-105 trnsition duration-150 bg-gradient-to-r  from-green-600 to-emerald-300 text-white rounded ">Yes</Button>
                            <Button onClick={() => {
                                setAct(false)

                            }} className="px-8 py-2 hover:scale-105 trnsition duration-150 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded">No</Button>
                        </div>
                    </div>
                </div>
            )}
            {
                successfullMessage && (
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