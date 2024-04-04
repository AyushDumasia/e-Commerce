import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {FiPlus, FiMinus} from 'react-icons/fi'
import {toast} from 'react-toastify'
import ToastContainer from './Toast/CustomToastContainer'

function Cart() {
    const [cart, setCart] = useState({cartItems: [], totalPrice: '0.00'})

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/product/cart',
                {withCredentials: true},
            )
            setCart(response.data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const updateQuantity = async (id, action) => {
        try {
            await axios.get(
                `http://localhost:3000/api/product/${action}/${id}`,
                {
                    withCredentials: true,
                },
            )
            fetchData()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="container mx-auto">
            <ToastContainer />
            <div className="text-center py-8">
                <h1 className="font-bold text-start text-2xl">My Cart</h1>
                {cart.cartItems.map((item) => (
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
                            <h3 className="text-lg  font-semibold mb-2">
                                {item.productId.productName}
                            </h3>
                            {/* <p className="text-sm mb-2">
                                Category: {item.productId.category}
                            </p>
                            <p className="text-sm mb-2">
                                Description: {item.productId.description}
                            </p> */}
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
                ))}
                <p className="font-bold mt-4 text-start">
                    Total Price: ₹{cart.totalPrice}
                </p>
            </div>
        </div>
    )
}

export default Cart
