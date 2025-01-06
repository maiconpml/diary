import { useNavigate } from "react-router-dom"
import { logout } from "../services"
import { useAuth } from "../contexts"
import { useEffect, useState } from "react"
import DiaryPage from "./DiaryPage"
import { createAppointment, getAppointments, getAppointmentsByDate } from "../services/requests"
import gsap from 'gsap'
import { useGSAP} from '@gsap/react'
import { FaPlus } from "react-icons/fa"
import { ImCross } from "react-icons/im";
import { IoCloseOutline } from "react-icons/io5";
import AppointmentForm from "./AppointmentForm"

const Home = () => {
    const dateNow = new Date()
    const navigate = useNavigate()
    const { authLogout } = useAuth()
    const [translation, setTranslation] = useState(true)
    const [appointments, setAppointments] = useState([])
    const { contextSafe } = useGSAP()
    const [newAppointment, setNewAppointment] = useState({"title":"", "description": "", "date": new Date()})

    const handleLogout = async () => {
        const response = await logout()
        if(response.success == true){
            authLogout()
            navigate('/login')
        }else{
            alert("Logout failed")
        }
    }

    const handleCreateAppointment = async (e) => {
        e.preventDefault()
        try{
            console.log(newAppointment)
            const responseData = await createAppointment(newAppointment.title, newAppointment.description, newAppointment.date)
            alert("appointment creates!")
            setAppointments([...appointments, {"title":newAppointment.title, "description": newAppointment.description, "date": newAppointment.date}])
            setNewAppointment({"title":"", "description": "", "date": new Date()})
        }catch(error){
            console.log(error)
            alert("error in appointment creation")
        }
    }

    const handleShowForm = contextSafe(() => {
        gsap.to('.animated', {opacity: '1', translateX: 0, duration: 0.25})
    })

    const handleHideForm = contextSafe(() => {
        gsap.to('.animated', {opacity: '0', translateX: '25%', duration: 0.05})
    })

    useEffect(() => {
        const fetchAppointments = async () => {
            try{
                console.log(dateNow)
                const data = await getAppointmentsByDate(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate())
                const parsedData = data.map((d) => {return {...d, date: new Date(d.date)}})
                setAppointments(parsedData)
            }catch(error){
                console.log(error)
                alert("error getting appointments")
            }
        }
        fetchAppointments()
    }, [])

    console.log(appointments)

    useEffect(() => { document.body.style.backgroundColor = '#f3eedd' }, [])
    
    return(
        <>
            <div className="relative flex mt-32" >
                <div className="relative w-1/2 h-full min-w-1/2 pl-4 pr-2 duration-[200ms] ease-out" style={{transform: `translateX(${translation?50:0}%)`}}>
                    <DiaryPage appointments={appointments} date={dateNow}/>
                    {translation && <button className="absolute right-0 flex justify-center items-center m-4 w-12 h-12 text-3xl rounded-full bg-black" onClick={() => {
                        setTranslation(!translation)
                        setTimeout(handleShowForm, 10)
                        }}><FaPlus className="text-[#f3eedd]" /></button>}
                </div>
                
                {!translation &&  <div className="w-1/2 pl-2 pr-4 opacity-0 translate-x-[20%] animated">
                     
                        <button className="absolute right-0 flex justify-center items-center m-4 w-12 h-12 text-3xl rounded-full " onClick={() => {
                        handleHideForm()
                        setTimeout(()=>{setTranslation(!translation)}, 50)
                        }}><IoCloseOutline className="text-black" /></button>
                        <AppointmentForm appointment={newAppointment} setAppointment={setNewAppointment} handleCreateAppointment={handleCreateAppointment}/>
                        </div>} 
                  
                    {/* <label className="w-full ">Title:<br/>
                    <input type="text" name="username-input" placeholder="Appointment's title" onChange={(e) => {setUsername(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-1 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>
                    <label className="w-full">Username:<br/>
                    <input type="text" name="username-input" placeholder="Your username" onChange={(e) => {setUsername(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-1 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>
                    <label className="w-full ">Username:<br/>
                    <input type="text" name="username-input" placeholder="Your username" onChange={(e) => {setUsername(e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-1 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/> */}
                
            </div>
            {/* <button onClick={handleLogout}>Logout</button> */}
        </>
    )
}

export default Home