import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services"
import background from '../../public/praia2-bg.jpg'


const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        if(password === confirmPassword){
            try{
                await register(username, email, firstName, lastName, password)
                alert('Register sucessful')
                navigate('/login')
            }catch{
                alert('Error in registration')
            }
        }else {
            alert("passwords must be equal")
        }
    }

    return(
        <>
            <div className="min-h-screen text-[--fontprimarycol]" style={{backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%"}}>
                <div className=" h-screen flex items-center justify-center ">
                    <div className="flex items-center justify-center rounded-md shadow-full w-3/5 h-3/4 min-w-min overflow-clip">
                        <div className="relative flex flex-col justify-center items-center p-10 w-1/2 h-full min-w-min max-w-full bg-[--primarycol]">    
                            <form onSubmit={handleRegister} className="flex flex-col justify-center items-center w-full text-base ">
                                <label className="w-3/4 ">Username:<br/>
                                <input type="text" placeholder="Your username" onChange={(e) => {setUsername(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>
                                
                                <label className="w-3/4 ">Email:<br/>
                                <input type="email" placeholder="e. g. email@email.com" onChange={(e) => {setEmail(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                                <label className="w-3/4 ">First Name:<br/>
                                <input type="text" placeholder="Your first name" onChange={(e) => {setFirstName(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                                <label className="w-3/4 ">Last Name:<br/>
                                <input type="text" placeholder="Your last name" onChange={(e) => {setLastName(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                                <label className="w-3/4 ">Password:<br/>
                                <input type="password" placeholder="********" onChange={(e) => {setPassword(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                                <label className="w-3/4 ">Confirm Password:<br/>
                                <input type="password" placeholder="********" onChange={(e) => {setConfirmPassword(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                                <button type="submit" className=" bg-[--fontprimarycol] text-[--primarycol] px-8 py-3 rounded-md">Register</button> 
                            </form>
                            <button className="absolute bottom-3  mt-3" onClick={(e) => {
                                e.preventDefault 
                                navigate('/login')}}>
                                Already have an account? Signin
                            </button>
                        </div>
                        <div className="relative bg-transparent backdrop-blur-lg p-10 w-1/2 h-full min-w-min">
                            <h1 className="text-6xl antialiased font-bold">DIARY</h1>
                            <span className="text-4xl ">Never forget a commitment again.</span><br/>
                            <span className="absolute bottom-3 text-lg ">Coming soon to mobile!</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register