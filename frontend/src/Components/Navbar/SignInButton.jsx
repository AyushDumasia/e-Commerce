import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import {MdCreateNewFolder} from 'react-icons/md'
import 'react-toastify/dist/ReactToastify.css'
import {FaRegUserCircle, FaAngleUp, FaShoppingCart} from 'react-icons/fa'
import {IoStorefront} from 'react-icons/io5'

function SignInButton() {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [user, setUser] = useState(null)
    const [merchant, setMerchant] = useState(null)

    useEffect(() => {
        checkAuthentication()
        fetchMerchantData()
    }, [])

    const checkAuthentication = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/auth/currentUser',
                {withCredentials: true},
            )
            setUser(response.data)
        } catch (error) {
            toast.error('Error fetching')
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
        } catch (err) {
            // toast.error('Error fetching')
        }
    }

    const becomeMerchant = () => {
        navigate('/becomeMerchant')
    }

    const handleMouseEnter = () => {
        setShowMenu(true)
    }

    const handleMouseLeave = () => {
        setShowMenu(false)
    }

    return (
        <div className="relative ">
            <div
                className={`${
                    showMenu
                        ? 'bg-secondary text-white'
                        : 'bg-floralWhite text-white'
                } flex p-2 ml-2 rounded justify-evenly items-center`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <FaRegUserCircle /> &nbsp;{' '}
                {user ? user.username : <Link to="/login">Sign In</Link>} &nbsp;
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
                    className="absolute p-[15px] border-gray-300 border border-grey top-[40px] left-[-150px] bg-[#131921] shadow rounded-lg w-[250px] h-auto"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ul className="list-none p-0 m-0">
                        {!user && ( // Show sign-up option only if user is not authenticated
                            <Link to="/signup">
                                <li className="p-3 pl-3 cursor-pointer border-gray-300 border-b flex justify-between">
                                    New here?
                                    <p className="text-white">Sign Up</p>
                                </li>
                            </Link>
                        )}
                        {user && ( // Show profile and cart options if user is authenticated
                            <>
                                <Link to="/">
                                    <li className="p-2  cursor-pointer flex items-center border-b">
                                        <FaRegUserCircle /> &nbsp; My Profile
                                    </li>
                                </Link>
                                <Link to="/cart">
                                    <li className="p-2 cursor-pointer flex items-center border-b">
                                        <FaShoppingCart /> &nbsp; My Cart
                                    </li>
                                </Link>
                            </>
                        )}
                        {merchant ? (
                            <>
                                <Link
                                    to="/createProduct"
                                    className="p-2 cursor-pointer flex items-center border-b"
                                >
                                    <MdCreateNewFolder /> &nbsp;Create Product
                                </Link>
                                <p className="text-sm p-[5px] border-b">
                                    {' '}
                                    MerchantId : {merchant}
                                </p>
                            </>
                        ) : (
                            <button
                                onClick={becomeMerchant}
                                className="p-2 cursor-pointer flex items-center border-b"
                            >
                                <IoStorefront /> &nbsp; Become a Merchant
                            </button>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SignInButton
