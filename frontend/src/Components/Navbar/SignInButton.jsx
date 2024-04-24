import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {MdCreateNewFolder} from 'react-icons/md'
import {FaRegUserCircle, FaAngleUp, FaShoppingCart} from 'react-icons/fa'
import {IoStorefront} from 'react-icons/io5'
import {CiLogout} from 'react-icons/ci'
import Avatar from 'react-avatar'
import {useDispatch, useSelector} from 'react-redux'
import {GoHeartFill} from 'react-icons/go'
import {setUser} from '../../redux/user/userSlice'
import {FaUserCircle} from 'react-icons/fa'
import {ShoppingBag} from 'lucide-react'
// import {useLocation} from 'react-router-dom'

function SignInButton() {
    // const {pathname} = useLocation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, apiError} = useSelector((state) => state.user)

    const [showMenu, setShowMenu] = useState(false)
    const {merchant} = useSelector((state) => state.merchant)

    useEffect(() => {
        setShowMenu(false)
    }, [location.pathname])

    // const checkAuthentication = async () => {
    //     try {
    //         const response = await axios.get(
    //             'http://localhost:3000/api/auth/currentUser',
    //             {withCredentials: true},
    //         )
    //         setUser(response.data)
    //     } catch (error) {
    //         setUser(null)
    //     }
    // }

    const becomeMerchant = () => {
        navigate('/becomeMerchant')
    }

    const logout = async () => {
        try {
            await axios.get('http://localhost:3000/api/auth/logout', {
                withCredentials: true,
            })
            dispatch(setUser(null))
            // checkAuthentication()
        } catch (err) {
            console.log(err)
        }
    }
    const toggleMenu = () => {
        setShowMenu((prev) => !prev)
    }

    return (
        <div className="relative">
            <div className="flex p-2  rounded justify-evenly items-center">
                {user ? (
                    ''
                ) : (
                    <Link
                        to="/login"
                        className="py-2 px-[15px] hover:shadow-[grey] hover:shadow-lg cursor-pointer bg-[blue] text-white rounded-full transition-all duration-300"
                    >
                        Sign In
                    </Link>
                )}
                {!user ? (
                    <>
                        <Link hidden to="/cart">
                            <li className="p-2 cursor-pointer flex items-center">
                                <FaShoppingCart /> &nbsp; Cart
                            </li>
                        </Link>
                        &nbsp; &nbsp;
                        <Avatar
                            name={user?.username || 'U'}
                            size="35"
                            round={true}
                            onClick={toggleMenu}
                            style={{cursor: 'pointer', display: 'none'}}
                        />
                    </>
                ) : (
                    <>
                        <Link to="/cart">
                            {/* <li className="p-2 cursor-pointer flex items-center">
                                <FaShoppingCart /> &nbsp; Cart
                            </li> */}
                            <div className="mr-[15px]">
                                <ShoppingBag absoluteStrokeWidth />
                            </div>
                        </Link>
                        &nbsp; &nbsp;
                        <Avatar
                            name={user?.username || 'U'}
                            size="35"
                            round={true}
                            onClick={toggleMenu}
                            style={{cursor: 'pointer'}}
                        />
                    </>
                )}
                <FaAngleUp
                    className={`transform hidden ${
                        showMenu ? '' : 'hidden'
                    } rotate-[0deg] transition-transform duration-[300ms]`}
                />
            </div>
            <div
                className={`absolute font-normal p-[15px]  top-[50px] left-[-120px] bg-[#ffffff] shadow rounded-lg w-[250px] h-auto transition-opacity duration-300 ${
                    showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
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
                                <li className="p-2 cursor-pointer flex items-center">
                                    <FaUserCircle /> &nbsp; My Profile
                                </li>
                            </Link>
                            <Link to="/order">
                                <li className="p-2 cursor-pointer flex items-center border-b">
                                    <GoHeartFill /> &nbsp; My Order
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
                                <MdCreateNewFolder /> &nbsp; Create Product
                            </Link>
                            <p className="text-sm p-[5px] border-b">
                                {' '}
                                MerchantId : {merchant}
                            </p>
                        </>
                    )}
                    {user && (
                        <button
                            onClick={() => {
                                toggleMenu()
                                logout()
                            }}
                            className="p-[6px] text-[15px] w-[100px] cursor-pointer flex items-center border-b  text-black rounded-sm"
                        >
                            <CiLogout />
                            &nbsp; Logout
                        </button>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SignInButton
