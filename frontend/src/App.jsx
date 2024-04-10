import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'

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
