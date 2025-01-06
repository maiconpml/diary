const Appointment = ({appointment}) => {

    return (
        <>
            <div className="flex items-center h-[2rem] px-4">
                <div className="flex  py-4">
                    {appointment.date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:{appointment.date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}
                </div>
                <div className="h-[90%] w-[2px] m-4  bg-black opacity-25" />
                <div className="flex flex-col py-4">
                    <h2 className="text-xl font-bold">
                        {appointment.title} 
                    </h2>
                </div>
            </div>
            <div className="w-full h-[1px] bg-black opacity-25"/>
        </>
    )
}

export default Appointment