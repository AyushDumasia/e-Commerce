// PaymentSuccess.js
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router'
import axios from 'axios'

const SuccessPayment = () => {
    const navigate = useNavigate()

    const sendData = async () => {
        const address = localStorage.getItem('address')
        const order = localStorage.getItem('orders')

        const response = await axios.post(
            '/api/order/createOrder',
            {address: address, orders: order},
            {
                withCredentials: true,
            },
        )
    }

    // useEffect(() => {
    //     sendData()
    // }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img
                src="https://res.cloudinary.com/dxrzskzvj/image/upload/v1716377097/oloqtuumuegu2qdzsjpu.svg"
                alt="Logo"
                className="mb-8 w-[500px]"
            />
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-700">
                Thank you for your purchase.
            </p>
            <button
                className="  text-blue-600 font-bold py-2 px-4 rounded"
                onClick={() => {
                    navigate('/explore/1')
                }}
            >
                Continue Shopping
            </button>
        </div>
    )
}

export default SuccessPayment
