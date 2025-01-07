import { months } from "../constants"
import Appointment from "./Appointment"

const DiaryPage = ({appointments, date, setNewAppointment, showUpdateForm}) => {
    const header = <><span className="text-5xl font-extrabold">{String(months[date.getMonth()]).slice(0, 3).toUpperCase()}</span><span className="text-7xl font-extrabold">{date.getDate()}</span>
                <div className="w-full h-[3px] bg-black rounded-full"></div></>

    if(!appointments.length){
        return (
            <>
                {header}
                <div className="flex flex-col items-center w-full">
                    <span className="mt-16 text-xl">No appointments for today!</span>
                </div>
            </>
        )
    }

    const formattedAppointments = appointments.map((appointment) => <Appointment key={appointment.id} appointment={appointment} setNewAppointment={setNewAppointment} showUpdateForm={showUpdateForm}/>)

    return(
        <>
            {header}
            <div className="flex justify-center w-full">
                <div className="flex flex-col w-[98%]">
                    {formattedAppointments}
                </div>
            </div>
        </>
    )
}

export default DiaryPage