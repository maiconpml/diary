import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts"

const PublicRoute = () => {
    const { isAuth, isAuthLoading } = useAuth()

    if(isAuthLoading){
        return (
            <>
                loading...
            </>
        )
    }

    if(isAuth){
        return(
            <Navigate to={'/home'} />
        )
    }

    return (
        <>
            <Outlet/>
        </>
    )
}

export default PublicRoute