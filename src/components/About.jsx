import { Link } from "react-router-dom";
import man from "../assets/aboutSection.jpg"
import { ArrowRight } from "lucide-react";
import { ModelContext } from "../Contaxt/ModelContext";
import { useContext } from "react";
import LightRays from "./ui/LightRays";
const About = () => {
    const { isOpen, setIsOpen } = useContext(ModelContext)
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    const containerHeight =
        width >= 1024 ? "70vh" : width >= 640 ? "80vh" : width > 400 ? "100vh" : "125vh";

    return (
        <>
            <section id="about" className="py-4">

                <div className="w-full bg-black relative flex-wrap" style={{ height: containerHeight }}>
                    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
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

                    <div className="absolute inset-0">
                        <div className="py-5 flex justify-center  " >
                            <h1 className="relative md:text-5xl sm:text-3xl text-2xl font-bold text-center 
                 bg-gradient-to-r from-emerald-800 via-green-500 to-emerald-800 bg-clip-text text-transparent 
                 tracking-wide inline-block mx-auto animate-shine brightness-110 [background-size:200%_auto]">
                                About Our Microfinance Platform

                            </h1>
                        </div>
                        <div className=" flex flex-row flex-wrap mx-2 md:mx-4 rounded-lg  items-start justify-center">
                            <div className="  w-3/4 md:w-2/3 px-5 py-5 mx-2 rounded-lg my-4 text-gray-300 justify-center">
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
                                <img src={man} alt="" className="object-cover w-68 h-56 rounded-lg shadow-md border-2 border-gray-300" />
                            </div>

                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
export default About;