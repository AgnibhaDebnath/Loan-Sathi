import { useEffect, useState } from "react";
import Silk from "./ui/Silk";
import LightRays from "./ui/LightRays";
import { Check, Loader, CircleX, BriefcaseBusiness, User, IndianRupee } from "lucide-react"
const LoanStatus = () => {
    const [yourLoanStatus, setYourLoanStatus] = useState()

    useEffect(() => {

        const fetchData = async () => {
            const token = localStorage.getItem("token")

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

            <div className="w-full bg-black h-[950px] min-[980px]:h-[680px] relative">
                <div style={{ width: '100%', height: '100%', position: 'absolute', zIndex: "0" }}>
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#00ffff"
                        raysSpeed={1.5}
                        lightSpread={0.8}
                        rayLength={1.2}
                        followMouse={true}
                        mouseInfluence={0.1}
                        noiseAmount={0.1}
                        distortion={0.05}
                        className="custom-rays"
                    />
                </div>
                {(!yourLoanStatus) && <p>Loading...</p>}
                <div className="flex flex-wrap h-1/2 min-[980px]:h-[480px] flex-row justify-center gap-10 pt-32">
                    {yourLoanStatus?.map((Item, index) => (

                        <div key={index} className="h-full w-full min-[450px]:w-10/12  sm:w-[460px] relative inset-0  ">
                            <div className="relative h-full overflow-hidden rounded-xl">
                                <Silk
                                    speed={5}
                                    scale={1}
                                    color="#7B7481"
                                    noiseIntensity={1.5}
                                    rotation={0}
                                />
                                <div className="absolute  inset-0 shadow-2xl border-gray-500 border-2 p-3 rounded-xl pb-4">
                                    <div className="flex justify-center py-1">
                                        <h1 className="text-pink-600 text-3xl font-bold brightness-125">Your Loan application</h1>
                                    </div>

                                    <div className="flex flex-col gap-4 py-5 px-3 flex-wrap">
                                        <div className="text-base font-medium flex">
                                            <span className="text-white">Name:</span> <h1 className="text-cyan-500"> {Item.first_name} {Item.last_name}</h1>
                                        </div>
                                        <div className="text-base font-medium">
                                            <h1 className="text-cyan-500"> <span className="text-white">Application Date:</span> {Item.submitted_at ? new Date(Item.submitted_at).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}</h1>
                                        </div>

                                        <div className="text-base font-medium">
                                            <h1 className="text-gray-200 flex items-center">
                                                <span className="text-white mr-2">Loan Status:</span>

                                                {Item.loan_status === "pending" && (
                                                    <>
                                                        <Loader className="text-yellow-400 animate-spin inline-block" size={20} aria-label="pending" />

                                                        <span className="ml-2 capitalize text-yellow-400">
                                                            {Item.loan_status}
                                                        </span>
                                                    </>
                                                )}
                                                {Item.loan_status === "approved" && (
                                                    <>
                                                        <Check className="text-green-400 inline-block" size={20} aria-label="approved" strokeWidth={3} />
                                                        <span className="ml-2 capitalize text-green-400">
                                                            {Item.loan_status}
                                                        </span>
                                                    </>
                                                )}
                                                {Item.loan_status === "rejected" && (
                                                    <>
                                                        <CircleX className="text-red-400 inline-block" size={20} aria-label="rejected" />
                                                        <span className="ml-2 capitalize text-red-400">
                                                            {Item.loan_status}
                                                        </span>
                                                    </>
                                                )}

                                            </h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col py-5 justify-between px-3 flex-wrap gap-4">
                                        <div className="text-base font-medium">
                                            <ul>
                                                {Item.loan_status === "approved" && (
                                                    <li className="text-cyan-400">Approved on: <span className="text-gray-300">{Item.decision_at ? new Date(Item.decision_at).toLocaleString(undefined, { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: '2-digit' }) : ''}</span></li>
                                                )}
                                                {Item.loan_status === "rejected" && (
                                                    <li className="text-red-500 brightness-110">Rejected on: <span className="text-gray-300">{Item.decision_at ? new Date(Item.decision_at).toLocaleString(undefined, { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: '2-digit' }) : ''}</span></li>
                                                )}
                                                {Item.loan_status === "pending" && (
                                                    <li className="list-disc text-yellow-400">Your loan application is under review</li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="text-base font-medium">
                                            <h1><span className="text-white">Loan type:</span>
                                                {Item.loan_type == "Business" && (<BriefcaseBusiness className="inline-block mx-2 text-blue-500" />)}
                                                {Item.loan_type == "Personal" && (<User className="inline-block mx-2 text-blue-500" />)}
                                                <span className="text-gray-300">{Item.loan_type}</span>
                                            </h1>
                                        </div>
                                        <div className="text-base font-medium ">
                                            <h1><span className="text-white">Your loan amount:</span>
                                                <IndianRupee className="inline-block mx-2 text-gray-300 " size={18} />
                                                <span className="text-green-500">{Item.loan_amount}</span>

                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >

                    ))

                    }
                </div>
            </div>
        </>
    )
}
export default LoanStatus;