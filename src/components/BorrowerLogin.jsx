import { ModelContext } from "@/Contaxt/ModelContext";
import { useContext } from "react";
import { Input } from "./ui/input";
import { X } from "lucide-react";
const Borrowerlogin = () => {
    const { Borrowerlogin, setBorrowerlogin } = useContext(ModelContext)
    return (
        <>
            {Borrowerlogin && <div className="fixed top-20 md:top-36 left-1/2  transform -translate-x-1/2 w-4/5 sm:w-3/5 lg:w-2/5 bg-white p-5 rounded-xl shadow-2xl z-40">
                <div className="flex justify-end ">
                    <button onClick={() => {
                        setBorrowerlogin(!Borrowerlogin)
                    }}>
                        <X />
                    </button>
                </div>
                <div className="flex justify-center my-2 py-2">
                    <h1 className="text-center font-bold text-xl sm:text-2xl md:text-3xl">Borrower Login</h1>
                </div>
                <form>
                    <div className="flex flex-col items-center gap-2 text-base font-medium">


                        <Input placeholder="Enter mobile no" className="lg:w-4/6 w-4/5 md:w-3/5 " />
                        <button className="py-1 rounded-sm px-3 bg-gradient-to-r text-white hover:scale-105 from-pink-600 to-red-500 transition duration-200">submit</button>
                    </div>
                </form>
            </div>}

        </>
    )
}
export default Borrowerlogin;