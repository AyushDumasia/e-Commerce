import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Home() {
    const [products, setProducts] = useState([])

    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/product/fetchProduct',
            )
            setProducts(response.data.data)
            // if (Array.isArray(response.data)) {
            //     setProducts(response.data)
            // } else {
            //     console.error('Invalid response format:', response.data)
            // }
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div>
            <h2>Products</h2>
            <div>
                {products.map((product) => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>Category: {product.category}</p>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
