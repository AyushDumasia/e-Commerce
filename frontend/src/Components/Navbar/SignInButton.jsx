import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {MdCreateNewFolder} from 'react-icons/md'
import {FaRegUserCircle, FaAngleUp, FaShoppingCart} from 'react-icons/fa'
import {IoStorefront} from 'react-icons/io5'
import Avatar from 'react-avatar'
import {useDispatch, useSelector} from 'react-redux'
import {GoHeartFill} from 'react-icons/go'
import {setUser} from '../../redux/user/userSlice'

function SignInButton() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, apiError} = useSelector((state) => state.user)

    const [showMenu, setShowMenu] = useState(false)
    const {merchant} = useSelector((state) => state.merchant)

    useEffect(() => {
        try {
            // fetchMerchantData()
        } catch (err) {
            return
        }
    }, [])

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

    return (
        <div className="relative">
            <div
                className="flex p-2 ml-2 rounded justify-evenly items-center"
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
            >
                {user ? '' : <Link to="/login">Sign In</Link>} &nbsp;
                {!user ? (
                    ''
                ) : (
                    <Avatar
                        name={user?.username || 'U'}
                        size="35"
                        round={true}
                        style={{fontSize: '160px'}}
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
            <div
                className={`absolute p-[15px]  border border-black top-[40px] left-[-150px] bg-[#ffffff] shadow rounded-lg w-[250px] h-auto transition-opacity duration-300 ${
                    showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
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
                                <li className="p-2  cursor-pointer flex items-center border-b border-black">
                                    <FaRegUserCircle /> &nbsp; My Profile
                                </li>
                            </Link>
                            <Link to="/cart">
                                <li className="p-2 cursor-pointer flex items-center border-b">
                                    <FaShoppingCart /> &nbsp; My Cart
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
                            className="p-2 cursor-pointer flex items-center border-b bg-[#bb2d3b] text-white rounded-md"
                        >
                            Logout
                        </button>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SignInButton
