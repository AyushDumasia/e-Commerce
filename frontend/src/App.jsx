import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import Home from './Components/Home'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import ShowProduct from './Components/ShowProduct'
import CreateProduct from './Components/CreateProduct'
import Cart from './Components/Cart'

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/createProduct" element={<CreateProduct />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/showDetails/:id" element={<ShowProduct />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
