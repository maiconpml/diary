import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services"


const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        if(password === confirmPassword){
            try{
                await register(username, email, firstName, password)
                alert('Register sucessful')
                navigate('/login')
                setUsername("")
                setEmail("")
                setFirstName("")
                setPassword("")
                setConfirmPassword("")
                handleChangeForm()
            }catch{
                alert('Error in registration')
            }
        }else {
            alert("passwords must be equal")
        }
    }

    return(
        <>
            <div className="relative flex flex-col justify-center items-center p-10 w-1/2 h-full min-w-[50%] max-w-full bg-[--primarycol] text-lg">    
                <form onSubmit={handleRegister} className="flex flex-col justify-center items-center w-full">
                    <label className="w-3/4 ">Username:<br/>
                    <input value={username} type="text" placeholder="Your username" onChange={(e) => {setUsername(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>
                    
                    <label className="w-3/4 ">Email:<br/>
                    <input value={email} type="email" placeholder="e. g. email@email.com" onChange={(e) => {setEmail(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                    <label className="w-3/4 ">First Name:<br/>
                    <input value={firstName} type="text" placeholder="Your first name" onChange={(e) => {setFirstName(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                    <label className="w-3/4 ">Password:<br/>
                    <input value={password} type="password" placeholder="••••••••" onChange={(e) => {setPassword(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                    <label className="w-3/4 ">Confirm Password:<br/>
                    <input value={confirmPassword} type="password" placeholder="••••••••" onChange={(e) => {setConfirmPassword(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                    <button type="submit" className=" bg-[--fontprimarycol] text-[--primarycol] px-8 py-3 rounded-md">Register</button> 
                </form>
                <button className="absolute bottom-3 mt-3" onClick={handleChangeForm}>
                    Already have an account? Signin
                </button>
            </div>
        </>
    )
}

export default Register