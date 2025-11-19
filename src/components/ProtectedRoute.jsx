import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebaseConfig";
const ProtectedRoute = ({ children }) => {
    const [Login, setLogin] = useState(false)
    const [Loading, setLoding] = useState(true)
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLogin(true)
                setLoding(false)
            }
        })
        return () => unsuscribe()
    }, [])
    if (Loading) return <p>Loading.....</p>
    return Login ? children : <Navigate to="/" replace />;
}
export default ProtectedRoute;