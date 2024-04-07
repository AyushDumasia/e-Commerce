import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {FiPlus, FiMinus} from 'react-icons/fi'
import {toast} from 'react-toastify'
import CustomToastContainer from './Toast/CustomToastContainer'
import {useNavigate} from 'react-router-dom'

function Cart() {
    const [cart, setCart] = useState({cartItems: [], totalPrice: '0.00'})
    const [checkedItems, setCheckedItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/product/cart',
                {withCredentials: true},
            )
            setCart(response.data)
            setCheckedItems(Array(response.data.cartItems.length).fill(false))
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleCheckboxChange = async (id, index) => {
        const newCheckedItems = [...checkedItems]
        newCheckedItems[index] = !newCheckedItems[index]
        setCheckedItems(newCheckedItems)

        try {
            const response = await axios.get(
                `http://localhost:3000/api/order/addOrder/${id}`,
                {
                    params: {
                        isChecked: newCheckedItems[index], // Send isChecked value to backend
                    },
                    withCredentials: true,
                },
            )
            console.log(response)
        } catch (error) {
            console.error(error.message)
        }
    }

    const orderBtn = async () => {
        try {
            navigate('/order')
        } catch (err) {
            console.log(err)
        }
    }

    const updateQuantity = async (id, action) => {
        try {
            await axios.get(
                `http://localhost:3000/api/product/${action}/${id}`,
                {withCredentials: true},
            )
            fetchData()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cards = () => {
        return cart.cartItems.map((item, index) => (
            <div
                key={item._id}
                className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-white my-4"
            >
                <input
                    type="checkbox"
                    name={item.productId._id}
                    checked={checkedItems[index]}
                    onChange={() => {
                        handleCheckboxChange(item.productId._id, index)
                    }}
                />
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
                            updateQuantity(item.productId._id, 'removeCart')
                        }
                    >
                        <FiMinus />
                    </button>
                    <p className="mx-2">{item.quantity}</p>
                    <button
                        className="text-black px-2 py-1 rounded"
                        onClick={() =>
                            updateQuantity(item.productId._id, 'addToCart')
                        }
                    >
                        <FiPlus />
                    </button>
                </div>
            </div>
        ))
    }

    return (
        <div className="container mx-auto">
            <CustomToastContainer />

            <div className="text-center py-8">
                <h1 className="font-bold text-start text-2xl">My Cart</h1>
                {!cart || cart.length === 0 ? <p>No cart found</p> : cards()}
            </div>
            <p className="font-bold mt-4 text-start">
                Total Price: ₹{cart.totalPrice}
            </p>
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
