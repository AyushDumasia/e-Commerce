import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {FiPlus, FiMinus} from 'react-icons/fi'

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
            console.error('Error fetching cart data:', error)
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
            console.error(
                `Error ${action === 'addToCart' ? 'increasing' : 'decreasing'} quantity:`,
                error,
            )
        }
    }

    return (
        <div className="container mx-auto">
            <div className="text-center py-8">
                <h1 className="font-bold text-start text-2xl">My Cart</h1>
                {cart.cartItems.map((item) => (
                    <div
                        key={item._id}
                        className="border border-gray-200 rounded-lg p-4 flex bg-amber-100 w-4/6 my-1 h-56"
                    >
                        <img
                            src={item.productId.coverImage}
                            alt=""
                            className="w-48 h-48 object-contain rounded mr-4"
                        />
                        <div className="text-start flex justify-between w-full justify-self-start">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    {item.productId.productName}
                                </h3>
                                <p className="text-sm mb-2">
                                    {item.productId.category}
                                </p>
                                <p className="text-sm mb-2">
                                    {item.productId.description}
                                </p>
                                <p className="text-sm mb-2">
                                    ₹{item.productId.price}
                                </p>
                            </div>
                            <div className="flex items-center self-center flex-col px-3">
                                <div className="flex">
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
