import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const AppointmentForm = ({appointment, setAppointment, handleCreateAppointment}) => {

    // const modifiers: DayPickerProps["modifiers"] = {};
    const hourOptions = []
    const handleDateSelect = (newSelected) => {
        const newAppointment = {
            ...appointment,
            date:newSelected
        }
        setAppointment(newAppointment)
    }

    const handleChange = (changed, value) => {
        const newAppointment = {
            ...appointment,
            [changed]: value
        }
        setAppointment(newAppointment)
    }



    for(let i=1; i<24; i++){
        hourOptions.push(<option>{i>12?(i-12)+'pm':i+'am'}</option>)
    }


    return (
        <>
            <form className="flex flex-col justify-center items-center mt-32 w-full" onSubmit={handleCreateAppointment}>
                <div className="flex flex-col">

                    <h1 className="text-5xl font-bold">Create Appointment</h1>
                                
                    <label className="w-full ">Title:<br/>
                    <input name="title" type="text" placeholder="Your appointment's`title" onChange={(e) => {handleChange('title', e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                    <input type="datetime-local"></input>

                            {/* <select>
                                {hourOptions}
                            </select> */}

                    <label className="w-3/4 ">Description:<br/>
                    <input name="description" type="text-field" placeholder="Your username" onChange={(e) => {handleChange('description', e.target.value)}} className="bg-[--primarycol]  p-2 w-full mt-0.5 border-b border-[--fontprimarycol] focus:outline-0"/></label><br/>

                    <button type="submit" className=" bg-[--fontprimarycol] text-[--primarycol] px-8 py-3 rounded-md mt-4">Create</button>
                </div>
            </form>
 

        </>
    )
}

export default AppointmentForm