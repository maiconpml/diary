import { useNavigate } from "react-router-dom"
import { logout } from "../services"
import { useAuth } from "../contexts"

const Home = () => {
    const navigate = useNavigate()
    const { authLogout } = useAuth()

    const handleLogout = async () => {
        const response = await logout()
        if(response.success == true){
            authLogout()
            navigate('/login')
        }else{
            alert("Logout failed")
        }
    }
    return(
        <>
            <p>Home Page</p>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Home