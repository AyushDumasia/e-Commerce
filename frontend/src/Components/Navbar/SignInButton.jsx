import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {
    FaRegUserCircle,
    FaHeadset,
    FaRegHeart,
    FaAngleUp,
    FaShoppingCart,
} from 'react-icons/fa'

function SignInButton() {
    const [showMenu, setShowMenu] = useState(false)
    let timeoutId

    const fetchUser = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/auth/currentUser',
                {withCredentials: true},
            )
            console.log(response)
        } catch (error) {
            console.error('Error fetching merchant data:', error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchMerchantData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/merchant/becomeMerchant',
                {withCredentials: true},
            )
            console.log(response)
        } catch (error) {
            console.error('Error fetching merchant data:', error)
        }
    }

    const handleMouseEnter = () => {
        clearTimeout(timeoutId)
        setShowMenu(true)
    }

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setShowMenu(false)
        }, 100)
    }
    return (
        <div className="relative">
            <Link
                to="/signin"
                className={`${
                    showMenu
                        ? 'bg-secondary text-white'
                        : 'bg-floralWhite text-black'
                } flex p-2 ml-2 rounded justify-evenly items-center`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <FaRegUserCircle /> &nbsp; Sign In &nbsp;{' '}
                <FaAngleUp
                    className={`transform ${
                        showMenu
                            ? 'rotate-[0deg] transition-transform duration-[450ms]'
                            : 'rotate-[-180deg] transition-transform duration-[450ms]'
                    }`}
                />
            </Link>
            {showMenu && (
                <div
                    className="absolute p-[15px] border-gray-300 border border-grey top-[40px] left-[-150px] bg-white shadow rounded-lg w-[250px]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ul className="list-none p-0 m-0">
                        <Link to="/signup">
                            <li className="p-3 pl-3 hover:bg-gray-100 cursor-pointer border-gray-300 border-b flex justify-between">
                                New here?
                                <p className="text-secondary">Sign Up</p>
                            </li>
                        </Link>
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
                        <button onClick={fetchMerchantData}>
                            become a Merchant
                        </button>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SignInButton
