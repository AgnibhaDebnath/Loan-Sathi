import { createContext, useState } from "react";
export const ModelContext = createContext();
export const ModelProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [LoginFormOpen, setLoginFormOpen] = useState(false)

    return (
        <ModelContext.Provider value={
            {
                isOpen,
                setIsOpen,
                LoginFormOpen,
                setLoginFormOpen
            }}
        >
            {children}
        </ModelContext.Provider>
    )
}