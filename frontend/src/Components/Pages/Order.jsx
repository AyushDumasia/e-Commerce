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
            setOrders(response.data.order)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase())
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
                    className="w-full h-48 object-cover object-center"
                    src={order.productId?.images[0]}
                    alt={order.productId.productName}
                />
                <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                        {capitalizeWords(
                            order.productId?.productName || 'Unknown Product',
                        )
                            .split(' ')
                            .slice(0, 3)
                            .join(' ')}
                    </h3>
                    <p className="text-xl    font-semibold">₹{order.price}</p>
                    {order.address && (
                        <div className="text-gray-700 text-sm mt-2 space-y-1">
                            <p>{order.address.address1}</p>
                            <p>
                                {order.address.city}, {order.address.state}
                            </p>
                            <p>{order.address.pinCode}</p>
                            <p>
                                Date:{' '}
                                <span className="font-medium text-gray-900">
                                    {/* {order.createdAt} */}
                                    {new Date(
                                        order.createdAt,
                                    ).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </p>
                        </div>
                    )}
                    <p
                        className={`text-[1rem] font-medium mt-2 ${getStatusColor(
                            order.status,
                        )}`}
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
                return 'text-green-600'
        }
    }

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-4xl font-bold mb-8 tracking-wide text-center text-gray-800">
                Your Orders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {loading ? (
                    <div className=" h-[90%] w-screen flex justify-center items-center">
                        <LoadingComponent />
                    </div>
                ) : orders.length === 0 ? (
                    <p className="text-xl text-slate-600 ">No Orders Yet</p>
                ) : (
                    renderOrderCards()
                )}
            </div>
        </div>
    )
}

export default Order
