import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {FaRegUserCircle, FaAngleUp, FaShoppingCart} from 'react-icons/fa'

function SignInButton() {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [user, setUser] = useState(null)
    const [merchant, setMerchant] = useState(null)

    useEffect(() => {
        // Check user authentication status when component mounts
        checkAuthentication()
        fetchMerchantData()
    }, [])

    const checkAuthentication = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/auth/currentUser',
                {withCredentials: true},
            )
            setUser(response.data) // Set user data
        } catch (error) {
            console.error('Error fetching user data:', error)
            setUser(null)
        }
    }

    const fetchMerchantData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/merchant/currentMerchant',
                {withCredentials: true},
            )
            setMerchant(response.data.licenseId)
            console.log(response.data.licenseId)
            console.log(response)
        } catch (err) {
            console.error('Error fetching')
        }
    }

    const becomeMerchant = () => {
        navigate('/becomeMerchant')
    }

    const handleMouseEnter = () => {
        setShowMenu(true) // Show the menu on mouse enter
    }

    const handleMouseLeave = () => {
        setShowMenu(false) // Hide the menu on mouse leave
    }

    return (
        <div className="relative">
            <div
                className={`${
                    showMenu
                        ? 'bg-secondary text-black'
                        : 'bg-floralWhite text-black'
                } flex p-2 ml-2 rounded justify-evenly items-center`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <FaRegUserCircle /> &nbsp; {user ? user.username : 'Sign In'}{' '}
                &nbsp;
                <FaAngleUp
                    className={`transform ${
                        showMenu
                            ? 'rotate-[0deg] transition-transform duration-[450ms]'
                            : 'rotate-[-180deg] transition-transform duration-[450ms]'
                    }`}
                />
            </div>
            {showMenu && (
                <div
                    className="absolute p-[15px] border-gray-300 border border-grey top-[40px] left-[-150px] bg-white shadow rounded-lg w-[250px]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ul className="list-none p-0 m-0">
                        {!user && ( // Show sign-up option only if user is not authenticated
                            <Link to="/signup">
                                <li className="p-3 pl-3 hover:bg-gray-100 cursor-pointer border-gray-300 border-b flex justify-between">
                                    New here?
                                    <p className="text-secondary">Sign Up</p>
                                </li>
                            </Link>
                        )}
                        {user && ( // Show profile and cart options if user is authenticated
                            <>
                                <Link to="/profile">
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                        <FaRegUserCircle /> &nbsp; My Profile
                                    </li>
                                </Link>
                                <Link to="/cart">
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                        <FaShoppingCart /> &nbsp; My Cart
                                    </li>
                                </Link>
                            </>
                        )}
                        {merchant ? (
                            <>
                                <p className="text-sm">
                                    {' '}
                                    MerchantId : {merchant}
                                </p>
                                <Link to="/createProduct">Create Product</Link>
                            </>
                        ) : (
                            <button onClick={becomeMerchant}>
                                Become a Merchant
                            </button>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SignInButton
