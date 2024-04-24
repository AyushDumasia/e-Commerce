import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
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
    const {pathname} = useLocation()
    const hideNavbarPaths = ['/login', '/signup']

    const shouldHideNavbar = hideNavbarPaths.includes(pathname)

    return (
        <>
            {!shouldHideNavbar && <Navbar />}
            <ScrollToTop />
            <Outlet />
        </>
    )
}

export default App
