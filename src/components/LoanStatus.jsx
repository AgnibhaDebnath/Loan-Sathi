import { useEffect, useState } from "react";

const LoanStatus = () => {
    const [yourLoanStatus, setYourLoanStatus] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token")
            try {
                const res = await fetch("http://localhost:3000/loan-status", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.json()
                const { user } = data;
                console.log(user)
                setYourLoanStatus(user)
            } catch (err) {
                console.log(err)
            }

        }
        fetchData();

    }, [])
    return (
        <div className="flex justify-center  mt-10">
            <div className="shadow-2xl w-2/3 ">
                <div className="flex justify-center my-2 text-2xl font-bold ">
                    <h1 className="text-pink-500">Your Loan application</h1>
                </div>
                <div>
                    {/* <h1>{yourLoanStatus.first_name}</h1> */}
                </div>


            </div>
        </div>
    )
}
export default LoanStatus;