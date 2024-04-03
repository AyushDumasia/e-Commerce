import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Cart() {
    const [cart, setCart] = useState({cartItems: [], totalPrice: '0.00'})
    // const [count , setCount] = useState()
    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/product/cart',
                {withCredentials: true},
            )
            console.log(response.data)
            setCart(response.data)
        } catch (error) {
            console.error('Error fetching cart data:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const increaseQuantity = async (id) => {
        const response = await axios.get(
            `http://localhost:3000/api/product/addToCart/${id}`,
            {withCredentials: true},
        )
        console.log(response)
    }

    const decreaseQuantity = async (id) => {
        // const updatedCart = {...cart}
        // const itemIndex = updatedCart.cartItems.findIndex(
        //     (item) => item._id === id,
        // )
        // if (itemIndex !== -1 && updatedCart.cartItems[itemIndex].quantity > 1) {
        //     updatedCart.cartItems[itemIndex].quantity--
        //     setCart(updatedCart)
        // }
        const response = await axios.get(
            `http://localhost:3000/api/product/removeCart/${id}`,
            {withCredentials: true},
        )
        console.log(response)
    }

    return (
        <div className="container mx-auto">
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4">Cart</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cart.cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="border border-gray-200 rounded-lg p-4"
                        >
                            <div>
                                <p>{item.productId._id}</p>
                                <h3 className="text-lg font-semibold mb-2">
                                    {item.productId.productName}
                                </h3>
                                <p className="text-sm mb-2">
                                    Category: {item.productId.category}
                                </p>
                                <p className="text-sm mb-2">
                                    Description: {item.productId.description}
                                </p>
                                <p className="text-sm mb-2">
                                    Price: ${item.productId.price}
                                </p>
                                <div className="flex items-center">
                                    <button
                                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                                        onClick={() =>
                                            decreaseQuantity(item.productId._id)
                                        }
                                    >
                                        -
                                    </button>
                                    <p className="mx-2">{item.quantity}</p>
                                    <button
                                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                                        onClick={() =>
                                            increaseQuantity(item.productId._id)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="font-bold mt-4">
                    Total Price: ${cart.totalPrice}
                </p>
            </div>
        </div>
    )
}

export default Cart
