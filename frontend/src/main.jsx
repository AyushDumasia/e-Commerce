import React from 'react'
import ReactDOM from 'react-dom'
import {
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App.jsx'
import './index.css'
import {store} from './redux/store.js'
import {persistor} from './redux/store.js'
import {PersistGate} from 'redux-persist/integration/react'
import LogIn from './Components/Cards/Forms/LogIn'
import Home from './Components/Pages/Home'
import SignUp from './Components/Cards/Forms/SignUp.jsx'
import Explore from './Components/Pages/Explore.jsx'
import Dashboard from './Components/Pages/Dashboard.jsx'
import Cart from './Components/Pages/Cart.jsx'
import CreateProduct from './Components/Cards/Forms/CreateProduct.jsx'
import ShowAddress from './Components/Pages/ShowAddress.jsx'
import Order from './Components/Pages/Order.jsx'
import ShowInfo from './Components/Pages/ShowInfo.jsx'
import MerchantForm from './Components/Pages/MerchantForm.jsx'
import AddressForm from './Components/Cards/Forms/AddressForm.jsx'
import DailyUserGraph from './Components/Pages/DailyUserGraph.jsx'
import SearchPage from './Components/Pages/SearchPage.jsx'
import FilterPage from './Components/Pages/FilterPage.jsx'
import AdminPage from './Components/Pages/AdminPage.jsx'
import AuthProvider from './Components/auth/AuthProvider'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/explore" element={<Explore />} />
            {/* <Route path="/*" element={<AuthProvider />}> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/address" element={<ShowAddress />} />
            <Route path="/order" element={<Order />} />
            <Route path="/becomeMerchant" element={<MerchantForm />} />
            <Route path="/createAddress" element={<AddressForm />} />
            <Route path="/chart" element={<DailyUserGraph />} />
            {/* </Route> */}
            <Route path="/showProduct/:id" element={<ShowInfo />} />
            <Route
                path="/explore/search/:searchTerm"
                element={<SearchPage />}
            />
            <Route
                path="/explore/search/:searchTerm/:option"
                element={<FilterPage />}
            />
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
