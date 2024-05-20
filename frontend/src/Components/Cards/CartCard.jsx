import axios from 'axios'
import {FiPlus, FiMinus} from 'react-icons/fi'
import {useEffect, useState} from 'react'
import ReactLoading from 'react-loading'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {setCart, setApiError} from '../../redux/cart/cartSlice'

function CartCard() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {cart} = useSelector((state) => state.cart)

    useEffect(() => {
        fetchCartData()
    }, [])

    const fetchCartData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/product/cart', {
                withCredentials: true,
            })
            console.log(response.data)
            dispatch(setCart(response.data))
        } catch (error) {
            dispatch(setApiError(error))
        } finally {
            setLoading(false)
        }
    }

    const updateQuantity = async (id, action) => {
        try {
            await axios.get(`/api/product/${action}/${id}`, {
                withCredentials: true,
            })
            fetchCartData()
            toast.success('Quantity updated successfully')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="overflow-auto">
            {loading ? (
                <div className="flex mt-24 justify-center items-center">
                    <ReactLoading
                        type={'spin'}
                        color={'blue'}
                        height={50}
                        width={50}
                    />
                </div>
            ) : !cart || cart.cartItems.length === 0 ? (
                <p className="text-center text-gray-600 my-4">
                    Nothing in cart
                </p>
            ) : (
                cart.cartItems.map((item) => (
                    <div
                        key={item._id}
                        className="rounded-lg p-4 flex items-center justify-between bg-white mb-4"
                    >
                        <div className="flex items-center ">
                            <img
                                src={item.productId?.images[0]}
                                alt={item.productId.productName}
                                className="w-36 h-36 object-cover rounded mr-4"
                            />
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    {item.productId.productName}
                                </h3>
                                <p className="text-sm mb-2">
                                    {item.productId.description}
                                </p>
                                <p className="text-sm mb-2">
                                    ₹{item.productId.price}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                className="text-gray-800 px-2 py-2 rounded-full  hover:bg-gray-100 focus:outline-none"
                                onClick={() =>
                                    updateQuantity(
                                        item.productId._id,
                                        'removeCart',
                                    )
                                }
                            >
                                <FiMinus />
                            </button>
                            <span className="text-gray-700">
                                {item.quantity}
                            </span>
                            <button
                                className="text-gray-800 px-2 py-2 rounded-full  hover:bg-gray-100 focus:outline-none"
                                onClick={() =>
                                    updateQuantity(
                                        item.productId._id,
                                        'addToCart',
                                    )
                                }
                            >
                                <FiPlus />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default CartCard
