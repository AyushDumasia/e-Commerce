// Import necessary modules
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {FiPlus, FiMinus} from 'react-icons/fi'
import {toast} from 'react-toastify'
import ToastContainer from './Toast/CustomToastContainer'
import {useNavigate} from 'react-router-dom'

function Cart() {
    const [cart, setCart] = useState({cartItems: [], totalPrice: '0.00'})
    const [isChecked, setIsChecked] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        fetchData() // Fetch cart data when component mounts
    }, [])

    // Fetch cart data from the server
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

    // Toggle checkbox for a cart item
    // const toggleCheckbox = async (itemId) => {
    //     try {
    //         setCart((prevCart) => {
    //             const updatedCartItems = prevCart.cartItems.map((item) => {
    //                 if (item.productId._id === itemId) {
    //                     return {
    //                         ...item,
    //                         isChecked: !item.isChecked,
    //                     }
    //                 }
    //                 return item
    //             })

    //             const checkedItemIds = updatedCartItems
    //                 .filter((item) => item.isChecked)
    //                 .map((item) => item.productId._id)

    //             // Send request to update server with checked item IDs
    //             axios
    //                 .post(
    //                     `http://localhost:3000/api/order/createOrder/${itemId}`,
    //                     {checkedProducts: checkedItemIds},
    //                     {withCredentials: true},
    //                 )
    //                 .then((response) => {
    //                     console.log(response)
    //                     // Update the state after receiving the response
    //                     setCart((prevCart) => ({
    //                         ...prevCart,
    //                         cartItems: updatedCartItems,
    //                     }))
    //                 })
    //                 .catch((error) => {
    //                     toast.error(error.message)
    //                 })

    //             // Return the updated state without waiting for the response
    //             return {
    //                 ...prevCart,
    //                 cartItems: updatedCartItems,
    //             }
    //         })
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }

    const handleCheckboxChange = () => {
        console.log(isChecked)
        setIsChecked(!isChecked)
        console.log(isChecked)
    }

    const orderBtn = async () => {
        try {
            const res = await axios.post(
                'http://localhost:3000/api/order/createOrder',
                null,
                {
                    withCredentials: true,
                },
            )
            navigate('/order')
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    // Update quantity of a cart item
    const updateQuantity = async (id, action) => {
        try {
            await axios.get(
                `http://localhost:3000/api/product/${action}/${id}`,
                {withCredentials: true},
            )
            fetchData() // Refresh cart data after updating quantity
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Render the cart items and total price
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
                        {/* <input
                            type="checkbox"
                            value={isChecked}
                            checked={item.productId.isChecked}
                            onChange={() => {
                                handleCheckboxChange(item.productId._id)
                            }}
                        /> */}
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
                ))}
                <p className="font-bold mt-4 text-start">
                    Total Price: ₹{cart.totalPrice}
                </p>
            </div>
            <button
                onClick={orderBtn}
                className="bg-blue-500 text-white px-6 py-3 my-2 md:mr-4 rounded hover:bg-blue-600"
            >
                Order Now
            </button>
        </div>
    )
}

export default Cart
