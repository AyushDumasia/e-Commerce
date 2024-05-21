import {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from 'react-loading' // Import react-loading
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
    const [imageIndex, setImageIndex] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const fetchMerchantData = async () => {
        try {
            const response = await axios.get('/api/merchant/currentMerchant', {
                withCredentials: true,
            })
            const localUser = localStorage.setItem(
                'merchant',
                JSON.stringify(response.data.licenseId),
            )
            dispatch(setMerchant(response?.data?.licenseId))
        } catch (err) {
            dispatch(setErrMerchant(err.message))
        }
    }

    const checkAuthentication = async () => {
        try {
            const response = await axios.get('/api/auth/currentUser', {
                withCredentials: true,
            })
            dispatch(setUser(response.data))
            const localUser = localStorage.setItem(
                'user',
                JSON.stringify(response.data),
            )
            fetchMerchantData()
        } catch (error) {
            dispatch(setApiError(null))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('/api/auth/login', formData, {
                withCredentials: true,
            })
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
        setLoading(false)
        setFormData({email: '', password: ''})
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

    return (
        <div className="flex justify-center items-center min-h-screen relative">
            <ToastContainer />
            <div className="flex w-[70%] max-w-screen-xl">
                <div
                    className="lg:block lg:w-[70%] bg-cover bg-center"
                    style={{
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        // backgroundImage: `url(${images[imageIndex]})`,
                        backgroundImage: `url("https://res.cloudinary.com/dxrzskzvj/image/upload/v1715968109/mmhwlbsmptyvmubyfcr6.svg")`,
                    }}
                ></div>
                <div className="lg:w-1/2 px-10 py-16 relative">
                    {loading && (
                        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
                            <Loading type="spin" color="#000" />
                        </div>
                    )}
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Welcome Back!
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className={loading ? 'blur-sm' : ''}
                    >
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            name="email"
                            handler={handleChange}
                        />
                        <Password
                            label="Password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            handler={handleChange}
                        />
                        <Button text="Sign In" className="w-full mt-4" />
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
        </div>
    )
}

export default LogIn
