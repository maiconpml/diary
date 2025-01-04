import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services"


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
            <form onSubmit={handleRegister}>
                <label >Username:<br/>
                <input type="text" placeholder="user123" onChange={(e) => {setUsername(e.target.value)}}/></label><br/>
                <label >Email:<br/>

                <input type="email" placeholder="email@email.com" onChange={(e) => {setEmail(e.target.value)}}/></label><br/>

                <label >First Name:<br/>
                <input type="text" placeholder="" onChange={(e) => {setFirstName(e.target.value)}}/></label><br/>

                <label >Last Name:<br/>
                <input type="text" placeholder="" onChange={(e) => {setLastName(e.target.value)}}/></label><br/>

                <label >Password:<br/>
                <input type="password" placeholder="********" onChange={(e) => {setPassword(e.target.value)}} /></label><br/>

                <label >Confirm Password:<br/>
                <input type="password" placeholder="********" onChange={(e) => {setConfirmPassword(e.target.value)}} /></label><br/>

                <button type="submit">Register</button> 
            </form>
        </>
    )
}

export default Register