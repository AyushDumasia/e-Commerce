import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux' // Importing useDispatch and useSelector for Redux
import Navbar from './Components/Navbar/Navbar'
import axios from 'axios'
import {setApiError, setUser} from './redux/user/userSlice'

function ScrollToTop() {
    const {pathname} = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

function App() {
    return (
        <>
            <Navbar />
            <div className="m-16"></div>
            <ScrollToTop />
            <Outlet />
        </>
    )
}

export default App
