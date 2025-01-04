import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "../services";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(false)
    const [isAuthLoading, setIsAuthLoading] = useState(true)

    const checkAuth = async () => {
        try{
            await getAuth();
            setIsAuth(true)
        }catch(error){
            setIsAuth(false)
        }finally{
            setIsAuthLoading(false)
        }
    }

    const authLogin = () => {
        setIsAuth(true)
    }

    const authLogout = () => {
        setIsAuth(false)
    }

    useEffect(() => {
        checkAuth()
    }, [window.location.pathname])


    return (
        <AuthContext.Provider value={{isAuth, isAuthLoading, authLogin, authLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)