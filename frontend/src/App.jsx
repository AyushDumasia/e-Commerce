import Navbar from './Components/Navbar/Navbar'
import {Outlet} from 'react-router-dom'

function App() {
    return (
        <>
            <Navbar />
            <div className="m-16"></div>
            <Outlet className="mt-6" />
        </>
    )
}

export default App
