import React from 'react'
import SignUpForm from './components/Auth/SignUpForm.jsx'
import Home from './components/Home/Home.jsx'
import MainProductPage from './components/Product/MainProductPage.jsx'
import {Routes, Route, Navigate} from 'react-router-dom'
import './index.css'
import AddItemForm from './components/Item/AddItemForm.jsx'
import LogInform from './components/Auth/LogInform.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LogInform />} />
            <Route path="/addItem" element={<AddItemForm />} />
            <Route path="/showItem" element={<MainProductPage />} />
        </Routes>
    )
}

export default App
