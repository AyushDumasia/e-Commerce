import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App.jsx'
import Home from './Components/Home.jsx'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import CreateProduct from './Components/CreateProduct.jsx'
import Cart from './Components/Cart.jsx'
import './index.css'
import AdminPage from './Components/AdminPage.jsx'
import ShowInfo from './Components/ShowInfo.jsx'
import MerchantForm from './Components/MerchantForm.jsx'
import AddressForm from './Components/AddressForm.jsx'
import Order from './Components/Order.jsx'
import Explore from './Components/Explore.jsx'
import ShowAddress from './Components/ShowAddress.jsx'
import Dashboard from './Components/Dashboard.jsx'
import SearchPage from './Components/SearchPage.jsx'
import DailyUserGraph from './Components/DailyUserGraph.jsx'
import {store} from './redux/store.js'
import {persistor} from './redux/store.js'
import {PersistGate} from 'redux-persist/integration/react'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/address" element={<ShowAddress />} />
            <Route path="/order" element={<Order />} />
            <Route path="/showProduct/:id" element={<ShowInfo />} />
            <Route path="/becomeMerchant" element={<MerchantForm />} />
            <Route path="/createAddress" element={<AddressForm />} />
            <Route path="/chart" element={<DailyUserGraph />} />
            <Route path="/search/:searchTerm" element={<SearchPage />} />
            <Route path="/admin" element={<AdminPage />} />
        </Route>,
    ),
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>,
)
