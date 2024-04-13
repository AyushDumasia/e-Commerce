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
        <div className="mt-[100px] flex justify-center items-center">
            <ToastContainer />
            <div className="flex flex-col justify-center items-start w-[450px] bg-white p-8 rounded-lg">
                <h1 className="font-bold text-3xl mb-3">Sign In</h1>
                <Link to="/signup" className="text-sm text-gray-500 ml-auto">
                    Already have an account
                </Link>{' '}
                <form onSubmit={handleSubmit} className="w-full">
                    <Input
                        label={'Email'}
                        type={'email'}
                        placeholder={'abc@xyz.com'}
                        value={formData.email}
                        name={'email'}
                        handler={handleChange}
                    />
                    <Password
                        label={'Password'}
                        placeholder={'Password'}
                        name={'password'}
                        value={formData.password}
                        handler={handleChange}
                    />
                    <Button text={'Submit'} />
                </form>
            </div>
        </div>
    )
}

export default LogIn
