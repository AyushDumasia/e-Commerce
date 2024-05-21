import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Navbar from './Components/Navbar/Navbar'
import {setUser} from './redux/user/userSlice'

function ScrollToTop() {
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

function App() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const {pathname} = useLocation()

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('user'))
        if (localUser) {
            dispatch(setUser(localUser))
        } else {
            dispatch(setUser(null))
        }
        console.log('User after : ', user)
    }, [dispatch])

    const hideNavbarPaths = ['/login', '/signup', '/createProduct']
    const shouldHideNavbar = hideNavbarPaths.includes(pathname)

    return (
        <>
            {!shouldHideNavbar && <Navbar />}
            {!shouldHideNavbar && <div className="mb-16"></div>}
            <ScrollToTop />
            <Outlet />
        </>
    )
}

export default App
