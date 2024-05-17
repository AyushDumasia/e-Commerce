import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {css} from '@emotion/react'
import {ClipLoader} from 'react-spinners'

import Button from '../../Button/Button'
import Password from '../../Password/Password'
import Input from '../../Input/Input'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {setUser, setApiError} from '../../../redux/user/userSlice'
import {
    setMerchant,
    setErrMerchant,
} from '../../../redux/merchant/merchantSlice'

function SignUp() {
    const dispatch = useDispatch()
    const {user, apiError} = useSelector((state) => state.user)
    const {merchant, errMerchant} = useSelector((state) => state.merchant)
    const [imageIndex, setImageIndex] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        sex: '',
        password: '',
    })

    const checkAuthentication = async () => {
        try {
            const response = await axios.get('/api/auth/currentUser', {
                withCredentials: true,
            })
            dispatch(setUser(response.data))
        } catch (error) {
            setApiError(null)
        }
    }

    const images = [
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1714574519/lugwtmo5frftmbl8arow.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1714574517/fdstvw6hvptflfo40dbv.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1714574516/rv6akq6plnizkzhohgh4.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713523173/pdllkh07cwyuwtpr6ma0.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713944396/aep9j4vbebq36iwkdpwo.jpg',
    ]

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * images.length)
        setImageIndex(randomIndex)
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('/api/auth/signup', formData, {
                withCredentials: true,
            })
            navigate('/')
            checkAuthentication()
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Email is already registered')
            } else {
                toast.error('An error occurred. Please try again later.')
            }
        }
        setLoading(false)
    }

    const override = css`
        display: block;
        margin: 0 auto;
    `

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <ToastContainer />
            <div className="flex w-[75%] justify-center max-w-screen-xl relative">
                <div
                    className="lg:block lg:w-[70%] bg-cover bg-center"
                    style={{
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'white',
                        backgroundImage: `url("https://res.cloudinary.com/dxrzskzvj/image/upload/v1715968502/ypm6dg1vuogboygjkdmt.svg")`,
                    }}
                ></div>
                <div className="bg-white lg:w-[40%] p-10 relative">
                    {loading && (
                        <div className="absolute inset-0 flex justify-center items-center  bg-opacity-75 z-10">
                            <ClipLoader
                                color="#000"
                                loading={loading}
                                css={override}
                                size={35}
                            />
                        </div>
                    )}
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Sign Up
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className={loading ? 'blur-sm' : ''}
                    >
                        <Input
                            label="Name"
                            type="text"
                            placeholder="Name"
                            name="username"
                            value={formData.username}
                            handler={handleChange}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="abc@xyz.com"
                            name="email"
                            value={formData.email}
                            handler={handleChange}
                        />
                        <Input
                            label="Phone"
                            type="number"
                            placeholder="Mobile Number"
                            name="phone"
                            value={formData.phone}
                            handler={handleChange}
                        />
                        <label>Gender: </label>
                        <select
                            label="sex"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="border border-[grey] p-2 cursor-pointer rounded mt-[3px] w-full text-base focus:outline-none no-arrow text-placeholder"
                        >
                            <option value="" disabled hidden>
                                Select Gender
                            </option>
                            <option value="Male" className="text-black">
                                Male
                            </option>
                            <option value="Female" className="text-black">
                                Female
                            </option>
                        </select>
                        <Password
                            label="Password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            handler={handleChange}
                        />
                        <Button
                            text="Submit"
                            className="w-full mt-4"
                            disabled={loading}
                        />
                    </form>
                    <p className="text-center text-sm mt-4">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
