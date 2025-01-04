import { useState } from "react"
import { useNavigate } from "react-router-dom" 
import { useAuth } from "../contexts"
import { login } from "../services"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { authLogin } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        const data = await login(username, password)
        if(data.success){
            authLogin()
            navigate('/')
        }else{
            alert("Invalid credentials")
        }
    }

    return(
        <>
            <form onSubmit={handleLogin}>
                <label >Username:<br/>
                <input type="text" name="username-input" placeholder="user123" onChange={(e) => {setUsername(e.target.value)}}/></label><br/>
                <label >Password:<br/>
                <input type="password" name="password-input" placeholder="********" onChange={(e) => {setPassword(e.target.value)}} /></label><br/>
                <button type="submit">Login</button> 
            </form>
        </>
    )
}

export default Login