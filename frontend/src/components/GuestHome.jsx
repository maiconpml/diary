import Register from './Register'
import Login from './Login'
import background from '../../public/praia2-bg.jpg'
import { useState } from 'react'

const GuestHome = () => {

    const [showLogin, setShowLogin] = useState(true)

    const handleChangeForm = () => {
        setShowLogin(!showLogin)
    }

    return(
        <>
        <div className="text-[--fontprimarycol]" style={{backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%"}}>
            <div className=" h-screen flex items-center justify-center ">
                <div className="flex items-center justify-center rounded-md shadow-full w-3/5 h-3/4 min-w-min overflow-hidden">
                    <div className='flex transition h-full' style={{transform: `translateX(-${showLogin?50:0}%)`}}>
                        <Register handleChangeForm={handleChangeForm} />
                        <div className="relative bg-transparent backdrop-blur-lg p-10 w-1/2 h-full min-w-[50%]">
                            <h1 className="text-6xl antialiased font-bold">DIARY</h1>
                            <span className="text-4xl ">Never forget a commitment again.</span><br/>
                            <span className="absolute bottom-3 text-lg ">Coming soon to mobile!</span>
                        </div>
                        <Login handleChangeForm={handleChangeForm} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default GuestHome