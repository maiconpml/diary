import { dateToISOLocal } from "../constants"
import { IoCloseOutline } from "react-icons/io5"

const AppointmentForm = ({appointment, setAppointment, handleCreateOrUpdateAppointment, hideAppointmentForm}) => {

    const handleChange = (changed, value) => {
        let newAppointment = {}
        if(changed === 'date'){
            newAppointment = {
                ...appointment,
                date: new Date(value)
            }
        }else{

            newAppointment = {
                ...appointment,
                [changed]: value
            }
        }
        setAppointment(newAppointment)
    }

    return (
        <>
            <form className="flex flex-col justify-center items-center mt-32 w-full" onSubmit={(e) => {handleCreateOrUpdateAppointment(e)}}>
                <div className="flex flex-col">
                    <button className="absolute right-0 flex justify-center items-center m-4 w-12 h-12 text-3xl rounded-full " onClick={hideAppointmentForm}>
                        <IoCloseOutline className="text-black" />
                    </button>

                    <h1 className="text-5xl font-bold">{appointment.id>0?"Update Appointment":"Create Appointment"}</h1>
                                
                    <label className="w-full ">Title:<br/>
                    <input name="title" type="text" placeholder="Your appointment's`title" onChange={(e) => {handleChange('title', e.target.value)}} value={appointment.title} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                    <input type="datetime-local" onChange={(e) => {handleChange('date', e.target.value)}} value={dateToISOLocal(appointment.date).slice(0,16)}></input>

                    <label className="w-3/4 ">Description:<br/>
                    <input name="description" type="text-field" placeholder="Your username" onChange={(e) => {handleChange('description', e.target.value)}} value={appointment.description} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                    <button type="submit" className=" bg-[--fontprimarycol] text-[--primarycol] px-8 py-3 rounded-md mt-4">{appointment.id>0?"Update":"Create"}</button>
                </div>
            </form>
 

        </>
    )
}

export default AppointmentForm