import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts"

const PrivateRoute = () => {
    const { isAuth, isAuthLoading } = useAuth()

    if(isAuthLoading){
        return (
            <>
                loading...
            </>
        )
    }

    if(!isAuth){
        return(
            <Navigate to={'/login/'} />
        )
    }

    return (
        <>
            <Outlet/>
        </>
    )
}

export default PrivateRoute