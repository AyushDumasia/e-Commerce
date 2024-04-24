import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/order/getOrder',
            )
            console.log(response.data)
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleStatusChange = async (id, newStatus) => {
        axios
            .put(
                `http://localhost:3000/api/order/changeStatus/${id}`,
                {status: newStatus},
                {
                    withCredentials: true,
                },
            )
            .then((response) => {
                console.log(response, newStatus)
                fetchData()
            })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="bg-[#cbc9c9] rounded-lg shadow-md overflow-hidden"
                >
                    {/* Product Image */}
                    <div className="relative">
                        <img
                            src={product.productId.images[0]}
                            alt={product.productId.productName}
                            className="w-[100%] h-[300px] object-cover rounded-t-lg"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                        <p>Order Id : {product?.orderId}</p>
                        <h2 className="text-xl font-bold mb-2">
                            {product.productId.productName}
                        </h2>
                        <p className="text-gray-600 mb-2">
                            Category: {product.productId.category}
                        </p>
                        <p className="text-gray-600 mb-2">
                            Price: ₹{product.price}
                        </p>
                    </div>

                    {/* User Details */}
                    {product.userId && (
                        <div className="p-4 border-t border-gray-300">
                            <div className="mb-4">
                                <p className="text-gray-600 mb-1">
                                    Username: {product.userId.username}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    Email: {product.userId.email}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    {product.userId.address}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Button */}
                    <div className="p-4 flex justify-end">
                        <select
                            value={product.status}
                            onChange={(e) =>
                                handleStatusChange(product._id, e.target.value)
                            }
                        >
                            <option value="confirm">Order Confirmed</option>
                            <option value="Shipped">Ready for shipping</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Processing">Processing</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList
