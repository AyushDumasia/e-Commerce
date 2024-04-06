// import Navbar from './Navbar/Navbar.jsx'
import {Outlet} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'

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
