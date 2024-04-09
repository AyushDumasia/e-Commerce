import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import {MdCreateNewFolder} from 'react-icons/md'
import 'react-toastify/dist/ReactToastify.css'
import {FaRegUserCircle, FaAngleUp, FaShoppingCart} from 'react-icons/fa'
import {IoStorefront} from 'react-icons/io5'
import Avatar from 'react-avatar'

function SignInButton() {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [user, setUser] = useState(null)
    const [merchant, setMerchant] = useState(null)

    useEffect(() => {
        checkAuthentication()
        try {
            fetchMerchantData()
        } catch (err) {
            return
        }
    }, [])

    const checkAuthentication = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/auth/currentUser',
                {withCredentials: true},
            )
            setUser(response.data)
        } catch (error) {
            // toast.error('Error fetching')
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
            setMerchant(null)
        }
    }

    const becomeMerchant = () => {
        navigate('/becomeMerchant')
    }

    const logout = async () => {
        try {
            await axios.get('http://localhost:3000/api/auth/logout', {
                withCredentials: true,
            })
            checkAuthentication()
        } catch (err) {
            console.log(err)
        }
    }

    const handleMouseEnter = () => {
        setShowMenu(true)
    }

    const handleMouseLeave = () => {
        setShowMenu(false)
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
                {user ? '' : <Link to="/login">Sign In</Link>} &nbsp;
                {!user ? (
                    <Avatar
                        name="U"
                        unstyled={false}
                        size="40"
                        githubHandle="{user?.username}"
                        round={true}
                    />
                ) : (
                    <Avatar
                        name={user?.username}
                        unstyled={false}
                        googleId={user?.username}
                        size="40"
                        round={true}
                        color="blue"
                    />
                )}
                <FaAngleUp
                    className={`transform hidden ${
                        showMenu
                            ? 'rotate-[0deg] transition-transform duration-[300ms]'
                            : 'rotate-[-180deg] transition-transform duration-[300ms]'
                    }`}
                />
            </div>
            {showMenu && (
                <div
                    className="absolute p-[15px] border-gray-300 border border-grey top-[40px] left-[-150px] bg-[#ffffff] shadow rounded-lg w-[250px] h-auto"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ul className="list-none p-0 m-0">
                        {!user && (
                            <Link to="/signup">
                                <li className="p-3 pl-3 cursor-pointer border-gray-300 border-b flex justify-between">
                                    New here?
                                    <p className="text-black">Sign Up</p>
                                </li>
                            </Link>
                        )}
                        {user && (
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
                        {user && !merchant && (
                            <button
                                onClick={becomeMerchant}
                                className="p-2 cursor-pointer flex items-center border-b"
                            >
                                <IoStorefront /> &nbsp; Become a Merchant
                            </button>
                        )}
                        {merchant && user && (
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
                        )}
                        {user && (
                            <button
                                onClick={logout}
                                className="p-2 cursor-pointer flex items-center border-b"
                            >
                                Logout
                            </button>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SignInButton
