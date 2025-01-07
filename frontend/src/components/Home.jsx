import { useNavigate } from "react-router-dom"
import { createAppointment, getAppointmentsByDate, logout, updateAppointment } from "../services"
import { useAuth } from "../contexts"
import { useEffect, useState } from "react"
import DiaryPage from "./DiaryPage"
import gsap from 'gsap'
import { useGSAP} from '@gsap/react'
import { FaPlus } from "react-icons/fa"
import { ImCross } from "react-icons/im";
import { IoCloseOutline } from "react-icons/io5";
import AppointmentForm from "./AppointmentForm"

const Home = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const navigate = useNavigate()
    const { authLogout } = useAuth()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [appointments, setAppointments] = useState([])
    const { contextSafe } = useGSAP()
    const [newAppointment, setNewAppointment] = useState({"id":-1, "title":"", "description": "", "date": new Date()})

    const handleLogout = async () => {
        const response = await logout()
        if(response.success == true){
            authLogout()
            navigate('/login')
        }else{
            alert("Logout failed")  
        }
    }

    const handleCreateOrUpdateAppointment = async (e) => {
        e.preventDefault()
        try {
            let responseData
            let newAppointments = []
            if(newAppointment.id >=0){
                responseData = await updateAppointment(newAppointment)
                alert("appointment updated!")
                newAppointments = appointments.filter((appointment) => appointment.id != newAppointment.id)
            }else{
                responseData = await createAppointment(newAppointment)
                alert("appointment created!")
            }
            setAppointments([...newAppointments, {"id": responseData.id, "title":responseData.title, "description": responseData.description, "date": new Date(responseData.date)}])
            setNewAppointment({"id":-1, "title":"", "description": "", "date": new Date()})
        }catch(error){
            console.log(error)
            alert("resquest error")
        }
    }

    const fetchAppointments = async () => {
        try{
            const data = await getAppointmentsByDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
            const parsedData = data.map((d) => {return {...d, date: new Date(d.date)}})
            setAppointments(parsedData)
        }catch(error){
            console.log(error)
            alert("error getting appointments")
        }
    }

    useEffect(() => {
        setCurrentDate(new Date(newAppointment.date))
        console.log(currentDate)
        fetchAppointments()
    }, [newAppointment.date])

    useEffect(() => {
        fetchAppointments()
    }, [])

    useEffect(() => { document.body.style.backgroundColor = '#f3eedd' }, [])
    
    return(
        <>
            <div className="relative flex justify-center" >
                <div className="relative w-[full] sm:w-[35rem] md:w-[40rem] 2xl:w-[50rem] h-full pr-2 mt-32">
                    <DiaryPage appointments={appointments} date={currentDate} setNewAppointment={setNewAppointment} showUpdateForm={() => setIsFormVisible(true)}/>
                    {!isFormVisible && <button className="absolute right-0 flex justify-center items-center m-4 w-12 h-12 text-3xl rounded-full bg-black" onClick={() => {
                        setIsFormVisible(!isFormVisible)
                        setNewAppointment({"id":-1, "title":"", "description": "", "date": new Date()})
                        }}>
                        <FaPlus className="text-[#f3eedd]" />
                    </button>}
                </div>
                
                {isFormVisible && <div className="pl-2">
                     
                    <AppointmentForm appointment={newAppointment} setAppointment={setNewAppointment} handleCreateOrUpdateAppointment={handleCreateOrUpdateAppointment} hideAppointmentForm={() => setIsFormVisible(false)}/>
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