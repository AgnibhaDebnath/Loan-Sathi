import { Link } from "react-router-dom";
import man from "../assets/aboutSection.jpg"
import { ArrowRight } from "lucide-react";
import { ModelContext } from "../Contaxt/ModelContext";
import { useContext } from "react";

const About = () => {
    const { isOpen, setIsOpen } = useContext(ModelContext)
    return (
        <>
            <section id="about" className="py-4">
                <div className="py-10 flex justify-center bg-gradient-to-r from-white via-yellow-400 to-white" >
                    <h1 className="relative md:text-5xl sm:text-3xl text-2xl font-bold text-center 
                 bg-gradient-to-r from-emerald-800 via-green-500 to-emerald-800 bg-clip-text text-transparent 
                 tracking-wide inline-block mx-auto animate-shine brightness-110 [background-size:200%_auto]">
                        About Our Microfinance Platform

                    </h1>
                </div>
                <div className=" flex flex-row  bg-gradient-to-r from-white via-yellow-400 to-white flex-wrap mx-2 md:mx-4 rounded-lg justify-center">
                    <div className="  w-2/3 px-5 py-10 mx-2 rounded-lg my-4">
                        <p className=" text-base sm:text-lg leading-relaxed mb-4">
                            We are a trusted microfinance provider dedicated to helping
                            <span className="  font-semibold bg-gradient-to-r from-white via-green-500 to-white px-2 text-transparent bg-clip-text animate-shine [background-size:200%_auto]">individuals</span> and
                            <span className="  font-semibold bg-gradient-to-r from-white via-green-500 to-white px-2 text-transparent bg-clip-text animate-shine [background-size:200%_auto]">small businesses</span>
                            achieve their financial goals. Our mission is to make access to credit simple,
                            fast, and fair for everyone.
                        </p>

                        <p className=" text-base sm:text-lg leading-relaxed mb-6 ">
                            With quick approvals, affordable interest rates, and minimal paperwork,
                            we support personal and business growth — helping you achieve your goals confidently.
                        </p>
                        <div className="text-white flex">
                            <button onClick={() => {
                                if (isOpen) {
                                    return
                                }
                                else {
                                    setIsOpen(!isOpen)
                                }
                            }} className=" bg-green-600 px-4 py-2 rounded-md hover:bg-green-700  gap-2 font-medium flex flex-row items-center hover:scale-105 transition duration-200">
                                Apply Now
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center my-2">
                        <img src={man} alt="" className="object-cover w-68 h-56 rounded-md shadow-md" />
                    </div>

                </div>

            </section>


        </>
    )
}
export default About;