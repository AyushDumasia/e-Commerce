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
                className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-300"
            >
                <img
                    className="w-full h-56 object-cover object-center"
                    src={order.productId?.images[0]}
                    alt={order.productId.productName}
                />
                <div className=" py-4">
                    <div className="font-semibold text-xl mb-2">
                        {order.productId.productName}
                    </div>
                    <p className="text-gray-700 text-base">
                        Price: ₹{order.price}
                    </p>
                    <p className={`text-base ${getStatusColor(order.status)}`}>
                        {order.status}
                    </p>
                    {order.address && (
                        <p className="text-gray-700 text-base">
                            {order.address.state} {order.address.pinCode}
                        </p>
                    )}
                </div>
            </div>
        ))
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing':
                return 'text-yellow-600'
            case 'Shipped':
                return 'text-blue-600'
            case 'Delivered':
                return 'text-green-600'
            case 'Cancelled':
                return 'text-red-600'
            default:
                return 'text-gray-700'
        }
    }

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-8 tracking-wide">
                Your Orders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
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
