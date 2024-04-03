import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'
import App from './App.jsx'
import Home from './Components/Home'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import CreateProduct from './Components/CreateProduct.jsx'
import Cart from './Components/Cart'
import './index.css'
import AdminPage from './Components/AdminPage.jsx'
import ShowInfo from './Components/ShowInfo.jsx'
import Temp from './Components/Temp.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/showProduct/:id" element={<ShowInfo />} />
            <Route path="/temp" element={<Temp />} />
        </Route>,
    ),
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
