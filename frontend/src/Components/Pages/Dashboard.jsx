import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchData() {
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
        fetchData()
    }, [])

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
                            src={product.productId.coverImage}
                            alt={product.productId.productName}
                            className="w-[100%] h-[300px] object-cover rounded-t-lg"
                        />

                        <div className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 rounded-bl-lg">
                            New
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
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
                            </div>
                        </div>
                    )}

                    {/* Button */}
                    <div className="p-4 flex justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Confirm
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList
