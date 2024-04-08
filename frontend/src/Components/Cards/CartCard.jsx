import axios from 'axios'
import {FiPlus, FiMinus} from 'react-icons/fi'
import {useEffect} from 'react'

import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {setCart, setApiError} from '../../redux/cart/cartSlice'

function CartCard({}) {
    const dispatch = useDispatch()
    const {cart, apiError} = useSelector((state) => state.cart)
    useEffect(() => {
        fetchCartData()
    }, [])

    const fetchCartData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/product/cart',
                {
                    withCredentials: true,
                },
            )
            dispatch(setCart(response.data))
        } catch (error) {
            handleApiError(error)
        }
    }
    const handleApiError = (error) => {
        if (error.response) {
            dispatch(setApiError(error.response.data))
        } else {
            dispatch(setApiError(error.response))
        }
    }

    const updateQuantity = async (id, action) => {
        try {
            await axios.get(
                `http://localhost:3000/api/product/${action}/${id}`,
                {
                    withCredentials: true,
                },
            )
            fetchCartData()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            {!cart || cart.length === 0 ? (
                <p>No cart found</p>
            ) : (
                cart.cartItems.map((item) => (
                    <div
                        key={item._id}
                        className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-white my-4"
                    >
                        <img
                            src={item.productId.coverImage}
                            alt=""
                            className="w-32 h-32 object-contain rounded mr-4"
                        />
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold mb-2">
                                {item.productId.productName}
                            </h3>
                            <p className="text-sm mb-2">
                                Price: ₹{item.productId.price}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="text-black px-2 py-1 rounded"
                                onClick={() =>
                                    updateQuantity(
                                        item.productId._id,
                                        'removeCart',
                                    )
                                }
                            >
                                <FiMinus />
                            </button>
                            <p className="mx-2">{item.quantity}</p>
                            <button
                                className="text-black px-2 py-1 rounded"
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
