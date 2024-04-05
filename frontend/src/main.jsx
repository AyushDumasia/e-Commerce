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
import MerchantForm from './Components/MerchantForm.jsx'
import AddressForm from './Components/AddressForm.jsx'
import Order from './Components/Order.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/order" element={<Order />} />
            <Route path="/showProduct/:id" element={<ShowInfo />} />
            <Route path="/becomeMerchant" element={<MerchantForm />} />
            <Route path="/createAddress" element={<AddressForm />} />
        </Route>,
    ),
)
ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <RouterProvider router={router} />,
    // </React.StrictMode>,
)
