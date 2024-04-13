import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import Password from '../../Password/Password'
import {FaSpinner} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../../../redux/user/userSlice'
import {setApiError} from '../../../redux/admin/adminSlice'

function SignUp() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {user, apiError} = useSelector((state) => state.user)
    const {merchant, errMerchant} = useSelector((state) => state.merchant)

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
    })

    const handleData = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const checkAuthentication = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/auth/currentUser',
                {withCredentials: true},
            )
            dispatch(setUser(response.data))
            // fetchMerchantData()
        } catch (error) {
            setApiError(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/signup',
                formData,
                {
                    withCredentials: true,
                },
            )
            toast.success('User signed up successfully')
            setInterval(2000)
            navigate('/')
            checkAuthentication()
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Email is already registered')
            } else {
                toast.error('An error occurred. Please try again later.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-[20px] flex justify-center items-center">
            <ToastContainer />
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <FaSpinner className="animate-spin text-blue-500 text-4xl" />
                </div>
            )}
            <div className="flex flex-col justify-center items-start w-[450px] bg-white p-8 rounded-lg">
                <h1 className="font-bold text-3xl mb-3">Sign Up</h1>
                <Link to="/login" className="text-sm text-gray-500 ml-auto">
                    Already have an account
                </Link>{' '}
                <form onSubmit={handleSubmit} className="w-full">
                    <Input
                        label={'Name'}
                        type={'text'}
                        placeholder={'Name'}
                        name={'username'}
                        value={formData.username}
                        handler={handleData}
                    />
                    <div className="mb-[5px] w-full">
                        <label htmlFor="Number" className="text-lg">
                            Number
                        </label>
                        <input
                            type="number"
                            placeholder="Mobile Number"
                            id="Number"
                            name="phone"
                            value={
                                formData.phone !== ''
                                    ? parseInt(formData.phone).toString()
                                    : ''
                            }
                            onChange={handleData}
                            className="border p-2 rounded mt-[3px] w-full text-base focus:outline-none no-arrow"
                        />
                    </div>
                    <Input
                        label={'Email'}
                        type={'email'}
                        placeholder={'abc@xyz.com'}
                        name={'email'}
                        value={formData.email}
                        handler={handleData}
                    />
                    <div className="mb-[5px] w-full">
                        <label htmlFor="Gender" className="text-lg">
                            Gender
                        </label>
                        <select
                            id="Gender"
                            value={formData.gender}
                            name={'gender'}
                            onChange={handleData}
                            className="border p-2 cursor-pointer rounded mt-[3px] w-full text-base focus:outline-none no-arrow text-placeholder"
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
                    </div>
                    <Password
                        label={'Password'}
                        placeholder={'Password'}
                        name={'password'}
                        value={formData.password}
                        handler={handleData}
                    />
                    {!loading && <Button text={'Submit'} />}
                </form>
            </div>
        </div>
    )
}

export default SignUp
