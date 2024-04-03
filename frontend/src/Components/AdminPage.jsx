import React, {useEffect, useState} from 'react'
import axios from 'axios'

function AdminPage() {
    const [products, setProducts] = useState([])

    const approvedProduct = async (id) => {
        try {
            const product = await axios.post(
                `http://localhost:3000/api/admin/validProduct/${id}`,
            )
            console.log(product)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/product/showTempProduct',
                {
                    withCredentials: true,
                },
            )
            console.log(response.data.data)
            setProducts(response.data.data)
        } catch (error) {
            console.error('Error fetching product:', error)
        }
    }

    useEffect(() => {
        fetchProduct()
    })
    return (
        <div>
            <h2>Admin</h2>
            <div>
                <h3>Products:</h3>
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            <img src={product.coverImage} alt="" />
                            <p>{product.productName}</p>
                            <p>{product.price}</p>
                            {/* Add more details as needed */}
                            <button
                                onClick={() => {
                                    approvedProduct(product._id)
                                }}
                            >
                                Approved
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AdminPage
