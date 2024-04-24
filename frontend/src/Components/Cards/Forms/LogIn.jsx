import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import Button from '../../Button/Button.jsx'
import Password from '../../Password/Password.jsx'
import Input from '../../Input/Input.jsx'

import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {setApiError, setUser} from '../../../redux/user/userSlice.js'
import {
    setErrMerchant,
    setMerchant,
} from '../../../redux/merchant/merchantSlice.js'

function LogIn() {
    const dispatch = useDispatch()
    const {user, apiError} = useSelector((state) => state.user)
    const {merchant, errMerchant} = useSelector((state) => state.merchant)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const fetchMerchantData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/merchant/currentMerchant',
                {withCredentials: true},
            )
            dispatch(setMerchant(response?.data?.licenseId))
        } catch (err) {
            dispatch(setErrMerchant(err.message))
        }
    }

    const checkAuthentication = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/auth/currentUser',
                {withCredentials: true},
            )
            dispatch(setUser(response.data))
            fetchMerchantData()
        } catch (error) {
            setApiError(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/login',
                formData,
                {withCredentials: true},
            )
            if (response.status === 200) {
                localStorage.setItem('userCookie', response.data.accessToken)
                navigate('/')
                checkAuthentication()
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error('Email or Password incorrect')
            } else {
                toast.error('An error occurred. Please try again later.')
            }
        }
        setFormData({email: '', password: ''})
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-600 to-indigo-600">
            <ToastContainer />
            <div className="flex flex-col justify-center w-[350px] bg-white bg-opacity-90 p-8 rounded-lg shadow-md">
                <h1 className="font-bold text-3xl mb-6 text-center">
                    Welcome Back!
                </h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        label={'Email'}
                        type={'email'}
                        placeholder={'Enter your email'}
                        value={formData.email}
                        name={'email'}
                        handler={handleChange}
                    />
                    <Password
                        label={'Password'}
                        placeholder={'Enter your password'}
                        name={'password'}
                        value={formData.password}
                        handler={handleChange}
                    />
                    <Button text={'Sign In'} className="w-full mt-4" />
                </form>
                <p className="text-center text-sm mt-4">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-blue-600 hover:underline"
                    >
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LogIn
