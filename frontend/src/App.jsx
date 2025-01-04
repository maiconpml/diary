
import { RouterProvider } from 'react-router-dom'
import {router} from "./router"
import { AuthProvider } from './contexts'

function App() {

  return (
    <div className='app'>
      <AuthProvider>
        
        <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  )
}

export default App
