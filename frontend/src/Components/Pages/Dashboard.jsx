import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/order/getOrder')
            console.log(response.data.data)
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await axios.put(
                `/api/order/changeStatus/${id}`,
                {status: newStatus},
                {withCredentials: true},
            )
            console.log(response, newStatus)
            fetchData()
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    return (
        <div className="p-5">
            {products.data === null ? (
                <p>No Orders yet</p>
            ) : (
                products.map((product) => (
                    <div
                        key={product._id}
                        className=" rounded-sm h-[200px] bg-white overflow-hidden flex mb-4"
                    >
                        <img
                            src={product.productId.images[0]}
                            alt={product.productId.productName}
                            className="w-[250px] h-auto object-cover"
                        />

                        <div className="p-4 flex-1">
                            <div>
                                <h2 className="text-xl font-bold mb-2">
                                    {product.productId.productName}
                                </h2>
                                <p className="text-gray-600 mb-2">
                                    Email: {product.userId.email}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    Price: ₹{product.price}
                                </p>
                            </div>
                        </div>

                        <div className="p-4">
                            <select
                                value={product.status}
                                onChange={(e) =>
                                    handleStatusChange(
                                        product._id,
                                        e.target.value,
                                    )
                                }
                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
                                style={{
                                    backgroundColor: 'white',
                                    color: '#333',
                                    fontSize: '15px',
                                    width: '200px',
                                }}
                            >
                                <option value="confirm">Order Confirmed</option>
                                <option value="Shipped">
                                    Ready for shipping
                                </option>
                                <option value="Delivered">Delivered</option>
                                <option value="Processing">Processing</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default ProductList
