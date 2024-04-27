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
                className="max-w-xs sm:max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-md mb-6"
            >
                <img
                    className="w-full h-44 object-cover object-center"
                    src={order.productId?.images[0]}
                    alt={order.productId.productName}
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                        {order.productId.productName}
                    </h3>
                    <p className="text-gray-600 text-base">
                        Price: ₹{order.price}
                    </p>
                    <p
                        className={`text-sm font-medium ${getStatusColor(
                            order.status,
                        )}`}
                    >
                        {order.status}
                    </p>
                    {order.address && (
                        <p className="text-gray-700 text-sm mt-2">
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
            <h2 className="text-3xl font-bold mb-8 tracking-wide text-center">
                Your Orders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {orders.length === 0 ? (
                    <p className="text-center text-gray-600">
                        No orders found.
                    </p>
                ) : (
                    renderOrderCards()
                )}
            </div>
        </div>
    )
}

export default Order
