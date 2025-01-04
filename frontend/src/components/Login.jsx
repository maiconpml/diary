import { useState } from "react"
import { useNavigate } from "react-router-dom" 
import { useAuth } from "../contexts"
import { login } from "../services"
import background from '../../public/praia2-bg.jpg'

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
            <div className="min-h-screen text-[--fontprimarycol]" style={{backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%"}}>
                <div className=" h-screen flex items-center justify-center ">
                    <div className="flex items-center justify-center rounded-md shadow-full w-1/2 h-1/2 min-w-min overflow-clip">
                        <div className="relative bg-transparent backdrop-blur-lg p-10 w-1/2 h-full min-w-min">
                            <h1 className="text-6xl antialiased font-bold">DIARY</h1>
                            <span className="text-4xl ">Never forget a commitment again.</span><br/>
                            <span className="absolute bottom-3 text-xl">Coming soon to mobile!</span>
                        </div>
                        <div className="relative flex flex-col justify-center items-center p-10 w-1/2 h-full min-w-min max-w-full bg-[--primarycol]">
                            <form className="flex flex-col justify-center items-center w-full  " onSubmit={handleLogin}>
                            

                                <label className="w-3/4 text-lg">Username:<br/>
                                <input type="text" name="username-input" placeholder="Your username" onChange={(e) => {setUsername(e.target.value)}} className="bg-[--primarycol] text-lg p-2 w-full mt-1 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                                <label className="w-3/4 text-lg">Password:<br/>
                                <input type="password" name="password-input" placeholder="••••••••" onChange={(e) => {setPassword(e.target.value)}} className="bg-[--primarycol] text-lg p-2 w-full mt-1 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                                <button type="submit" className="text-lg bg-[--fontprimarycol] text-[--primarycol] px-8 py-3 rounded-md">Login</button> 


                            </form>
                            <button className="absolute bottom-3 text-lg mt-3" onClick={(e) => {
                                e.preventDefault 
                                navigate('/register')}}>
                                Doesn't have an account? Signup
                            </button>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}

export default Login