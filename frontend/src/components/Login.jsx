import { useState } from "react"
import { useNavigate } from "react-router-dom" 
import { useAuth } from "../contexts"
import { login } from "../services"
import background from '../../public/praia2-bg.jpg'

const Login = ({handleChangeForm}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { authLogin } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        const data = await login(username, password)
        if(data.success){
            authLogin()
            navigate('/home')
        }else{
            alert("Invalid credentials")
        }
    }

    return(
        <>
            <div className="relative flex flex-col justify-center items-center p-10 w-1/2 h-full min-w-[50%] max-w-full bg-[--primarycol] text-lg">
                <form className="flex flex-col justify-center items-center w-full" onSubmit={handleLogin}>
                
                    <label className="w-3/4 ">Username:<br/>
                    <input type="text" name="username-input" placeholder="Your username" onChange={(e) => {setUsername(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-1 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                    <label className="w-3/4 ">Password:<br/>
                    <input type="password" name="password-input" placeholder="••••••••" onChange={(e) => {setPassword(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-1 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                    <button type="submit" className=" bg-[--fontprimarycol] text-[--primarycol] px-8 py-3 rounded-md">Login</button> 

                </form>
                <button className="absolute bottom-3  mt-3" onClick={handleChangeForm}>
                    Doesn't have an account? Signup
                </button>
            </div>
        </>
    )
}

export default Login