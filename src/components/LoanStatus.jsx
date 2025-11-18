import { useEffect, useState } from "react";

const LoanStatus = () => {
    const [yourLoanStatus, setYourLoanStatus] = useState()
    useEffect(() => {

        const fetchData = async () => {
            const token = localStorage.getItem("token")
            console.log(token)
            try {
                const res = await fetch("http://localhost:3000/loan-status", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
                const { user } = data;

                setYourLoanStatus(user)
            } catch (err) {
                console.log(err)
            }

        }
        fetchData();

    }, [])
    return (
        <>
            {(!yourLoanStatus) && <p>Loading...</p>}
            {yourLoanStatus &&
                <div className="flex justify-center  mt-10">
                    <div className="shadow-2xl lg:3/5 xl:w-2/5  border-gray-500 border-2 p-5 rounded-xl ">
                        <div className="flex justify-center  py-1 ">
                            <h1 className="text-pink-500 text-2xl font-bold">Your Loan application
                            </h1>
                        </div>

                        <div className="flex flex-col gap-4 py-5 px-3 flex-wrap">
                            <div className="text-base font-medium flex">

                                Name: <h1 className="text-cyan-500"> {yourLoanStatus.first_name} {yourLoanStatus.last_name}</h1>
                            </div>
                            <div className="text-base font-medium ">

                                <h1> Application Date: {yourLoanStatus.submitted_at ? new Date(yourLoanStatus.submitted_at).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}</h1>
                            </div>
                            <div className="text-base font-medium ">

                                <h1 className="">Loan Status:{yourLoanStatus.loan_status}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col py-5 justify-between px-3 flex-wrap gap-4">
                            <div className="text-base font-medium">
                                <ul>
                                    {yourLoanStatus.loan_status === "approved" && (
                                        <li>Approved at: {yourLoanStatus.decision_at}</li>
                                    )}

                                    {yourLoanStatus.loan_status === "rejected" && (
                                        <li>Rejected at: {yourLoanStatus.decision_at}</li>
                                    )}
                                    {yourLoanStatus.loan_status === "pending" && (
                                        <li className="list-disc">Your loan application is under review</li>
                                    )}
                                </ul>
                            </div>
                            <div className="text-base font-medium">

                                <h1>
                                    Loan type:{yourLoanStatus.loan_type}
                                </h1>
                            </div>
                            <div className="text-base font-medium ">

                                <h1>Your loan amount:{yourLoanStatus.loan_amount}</h1>
                            </div>


                        </div>


                    </div>
                </div>}
        </>
    )
}
export default LoanStatus;