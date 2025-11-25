import { Link } from "react-router-dom";
import money from "../assets/heroSection.jpg"
import { ArrowRight } from 'lucide-react';
import { ModelContext } from "../Contaxt/ModelContext";
import { useContext } from "react";
import BlurText from "./ui/BlurText";
const HeroSection = () => {
    const { isOpen, setIsOpen } = useContext(ModelContext)
    return (
        <>

            <div className="relative  h-[70vh] sm:h-screen mx-0 md:mx-4 md:rounded-b-2xl md:rounded-t-xl  overflow-hidden ">
                {/* Background Image */}
                <img
                    src={money}
                    alt="Money background"
                    className="absolute inset-0 w-full h-full object-cover "
                />


                <div className="absolute inset-0 bg-black bg-opacity-50 ">


                    <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
                        <div >
                            <BlurText
                                text="Empowering Local Dreams"
                                delay={400}
                                animateBy="words"
                                direction="top"
                                className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl  font-bold   brightness-150 pb-2 "
                            />
                        </div>

                        <p className="text-lg mb-6 font-medium">Empowering individuals and businesses with fast, secure, and affordable loans.</p>
                        <button onClick={() => {
                            if (isOpen) {
                                return
                            } else {
                                setIsOpen(!isOpen)
                            }
                        }} className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700  gap-2 font-medium flex flex-row items-center hover:scale-105 transition duration-200">
                            Apply Now
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

            </div>


        </>
    )
}
export default HeroSection;