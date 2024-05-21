import {useEffect, useState} from 'react'
import axios from 'axios'
import LoadingComponent from '../Cards/LoadingComponent'

function Order() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchOrder = async () => {
        try {
            const response = await axios.get('/api/order/fetchOrder', {
                withCredentials: true,
            })
            console.log(response)
            setOrders(response.data.order)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    const renderOrderCards = () => {
        return orders.map((order) => (
            <div
                key={order._id}
                className="max-w-xl min-w-[300px] mx-auto bg-white rounded-lg  overflow-hidden mb-6"
            >
                <img
                    className="w-full h-36 object-cover object-center"
                    src={order.productId?.images[0]}
                    alt={order.productId.productName}
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">
                        {order.productId.productName}
                    </h3>
                    <p className="text-gray-700 text-base">₹{order.price}</p>
                    {order.address && (
                        <div className="text-gray-700 text-sm mt-2">
                            <p>{order.address.address1}</p>
                            <p>
                                {order.address.city}, {order.address.state}
                            </p>
                            <p>{order.address.pinCode}</p>
                        </div>
                    )}
                    <p
                        className={`text-sm font-medium ${getStatusColor(
                            order.status,
                        )} mt-1`}
                    >
                        {order.status}
                    </p>
                </div>
            </div>
        ))
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing':
                return 'text-yellow-500'
            case 'Shipped':
                return 'text-blue-500'
            case 'Delivered':
                return 'text-green-500'
            case 'Cancelled':
                return 'text-red-500'
            default:
                return 'text-gray-500'
        }
    }

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-8 tracking-wide text-center text-gray-800">
                Your Orders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                    <div className="w-full flex justify-center items-center">
                        <LoadingComponent />
                    </div>
                ) : (
                    renderOrderCards()
                )}
            </div>
        </div>
    )
}

export default Order
