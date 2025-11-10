
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useContext, useRef, useState, useEffect } from "react";
import { ModelContext } from '../Contaxt/ModelContext';
import { Handshake } from 'lucide-react';
const Header = () => {
    const Links = [
        {
            LinkName: "Home",
            LinkTo: "/"
        },
        {
            LinkName: "About",
            LinkTo: "#about",

        },
        {
            id: 1,
            buttonName: "Apply",

        },
        {
            id: 2,
            buttonName: "My Loan",

        },
        {
            LinkName: "Contact",
            LinkTo: "#contact"
        },
        {
            buttonName: "Admin",

        }



    ]
    const navRef = useRef();
    const scrollLeft = () => {
        navRef.current.scrollBy({ left: -150, behavior: "smooth" })
    }
    const scrollRight = () => {
        navRef.current.scrollBy({ left: 150, behavior: "smooth" })
    }

    const { isOpen, setIsOpen } = useContext(ModelContext);
    const { LoginFormOpen, setLoginFormOpen } = useContext(ModelContext)
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 1000);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <header className="sticky brightness-125 z-50 top-0 bg-gradient-to-r from-emerald-700 via-green-100 to-green-600">
            {isWideScreen &&
                <div className='text-3xl font-bold flex items-center py-2 px-3  gap-2'>
                    <div className='h-12 w-12 rounded-full bg-white flex justify-center items-center'>
                        <  Handshake color='blue' />
                    </div>
                    <h1 className='font-[Poppins] text-white inline-block' > Loan Sathi</h1>
                </div>
            }
            <nav className="w-full flex justify-center items-center py-2  ">

                <button
                    onClick={scrollLeft}
                    className="bg-gray-100 p-2 sm:p-2.5 rounded-l-full z-10 sm:hidden"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className='sm:p-[3px] sm:bg-gradient-to-r from-white via-yellow-400 to-white w-2/3 flex sm:rounded-full justify-center animate-shine bg-[length:200%_200%]'>
                    <div ref={navRef} className="justify-evenly py-2 flex w-full items-center bg-white sm:rounded-full scrollbar-hide whitespace-nowrap overflow-x-auto">
                        <ul className="flex flex-row items-center">
                            {Links.map((link, index) =>
                                <li key={index} className="px-2 sm:px-2 md:px-3 lg:px-5 font-medium text-sm sm:text-base hover:text-green-400 hover:scale-105 transition duration-200">
                                    {link.buttonName ? (
                                        (() => {
                                            switch (link.buttonName) {
                                                case 'Apply':
                                                    return <button key={link.id} onClick={() => {
                                                        if (isOpen) {
                                                            return
                                                        }
                                                        else {
                                                            setIsOpen(true)
                                                        }
                                                    }}>
                                                        {link.buttonName}
                                                    </button>
                                                case 'My Loan':
                                                    return <button key={link.id} onClick={() => {
                                                        console.log("My loan clicked")
                                                    }
                                                    }>
                                                        {link.buttonName}
                                                    </button>
                                                case 'Admin':
                                                    return <button key={link.id} onClick={() => {
                                                        setLoginFormOpen(!LoginFormOpen)
                                                    }
                                                    }>
                                                        {link.buttonName}
                                                    </button>
                                                default:
                                                    return <button>{link.buttonName}</button>
                                            }
                                        })()
                                    ) : (
                                        <a href={link.LinkTo}>{link.LinkName}</a>
                                    )}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <button
                    onClick={scrollRight}
                    className="bg-gray-100 p-2 rounded-r-full z-60 sm:hidden"
                >
                    <ChevronRight size={20} />
                </button>
            </nav>
        </header>
    )
}
export default Header;