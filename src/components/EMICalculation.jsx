import { useState } from "react";

const FloatingEMICalculator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("");
    const [months, setMonths] = useState("");
    const [emi, setEmi] = useState(null);
    const [selectedOption, setSelectedOption] = useState("")

    const calculateEMI = (e) => {
        e.preventDefault();
        if (!amount || !selectedOption || !months || !(months > 0)) return;

        const principal = parseFloat(amount);
        const monthlyRate = parseFloat(rate) / 12 / 100;
        const tenure = parseInt(months);

        const emiValue =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
            (Math.pow(1 + monthlyRate, tenure) - 1);

        setEmi(emiValue.toFixed(2));

    };

    return (
        <>

            <button
                onClick={() => {
                    if (isOpen) {
                        setAmount("");
                        setRate("");
                        setMonths("");
                        setEmi("");
                        setSelectedOption("")
                    }
                    setIsOpen(!isOpen)
                }
                }
                className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow-lg z-50 transition-all font-medium text-base"
            >
                {isOpen ? "Close EMI Calculator" : "EMI Calculator"}
            </button>


            {isOpen && (
                <div className="fixed bottom-20 right-6 bg-white p-5 rounded-2xl shadow-2xl w-80 z-50 border border-gray-200">
                    <div className="flex justify-center">
                        <h3 className="w-full  text-lg font-medium bg-gradient-to-r from-emerald-800 to-green-500 bg-clip-text text-transparent 
                 tracking-wide inline-block mb-3 text-center">
                            EMI Calculator
                        </h3>
                    </div>
                    <form className="flex flex-col gap-3 items-center" onSubmit={calculateEMI}>
                        <input
                            type="text"
                            placeholder="Loan Amount (₹)"
                            value={amount}
                            onChange={(e) => {
                                const onlyDigits = e.target.value.replace(/\D/g, "")
                                setAmount(onlyDigits)
                            }}
                            className="border w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-base font-medium"
                        />
                        <p className=" w-full text-gray-700 font-medium text-left">
                            Choose a loan type:
                        </p>
                        <select value={selectedOption} onChange={(e) => {
                            const value = e.target.value;

                            setSelectedOption(value);
                            if (value == "Personal") {
                                setRate(16)
                            }
                            else if (value == "Business") {
                                setRate(12)
                            }
                            else {
                                setRate("")
                            }
                        }} className="border p-2 font-medium rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400" >
                            <option value="">Select a option</option>
                            <option value="Personal">Personal Loan</option>
                            <option value="Business">Business Loan</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Interest Rate (%)"
                            value={rate}
                            readOnly
                            className="border p-2 w-full rounded-lg focus:outline-none   text-base font-medium hover:cursor-not-allowed"
                        />
                        <input
                            type="number"
                            placeholder="Tenure (Months)"
                            value={months}
                            onChange={(e) => setMonths(e.target.value)}
                            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-base font-medium w-full "
                        />
                        <button
                            type="submit"
                            className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all text-base font-medium w-1/2"
                        >
                            Calculate
                        </button>
                    </form>

                    {emi && (
                        <div className="mt-3 text-center font-medium text-green-700">
                            Monthly EMI: ₹{emi}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default FloatingEMICalculator;
