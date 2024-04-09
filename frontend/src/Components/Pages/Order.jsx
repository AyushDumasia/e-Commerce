import {useEffect, useState} from 'react'
import axios from 'axios'

function Order() {
    const [orders, setOrders] = useState([])
    const [address, setAddress] = useState([])
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/order/fetchOrder',
                    {withCredentials: true},
                )
                console.log(response.data)
                setOrders(response.data.order)
                setAddress(response.data.address)
            } catch (err) {
                console.log(err)
            }
        }

        fetchOrder()
    }, [])

    const renderOrderCards = () => {
        return orders.map((order) => (
            <div
                key={order._id}
                className="max-w-md rounded overflow-hidden shadow-lg bg-white"
            >
                <img
                    className="w-full h-64 object-cover object-center"
                    src={order.productId.coverImage}
                    alt={order.productId.productName}
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                        {order.productId.productName}
                    </div>
                    <p className="text-gray-700 text-base">
                        Price: ₹{order.price}
                    </p>
                    {order.address && ( // Check if address is not null
                        <p className="text-gray-700 text-base">
                            {order.address.state} {order.address.pinCode}
                        </p>
                    )}
                </div>
            </div>
        ))
    }

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-8">My Orders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    renderOrderCards()
                )}
            </div>
        </div>
    )
}

export default Order
