import React, {useEffect, useState} from 'react'
import axios from 'axios'

function MainProductPage() {
    const [products, setProducts] = useState([])
    const [addCart, setCart] = useState([])

    let handleCart = () => {}

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/item/showItem',
                )
                if (Array.isArray(response.data)) {
                    setProducts(response.data)
                } else {
                    console.error('Invalid response data:', response.data)
                }
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }
        fetchProducts()
    }, [products])

    return (
        <div>
            <h1>Product List</h1>
            <p>Cart</p>
            <p></p>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <h2>{product.postedBy}</h2>
                        <h3>{product.productName}</h3>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.prize}</p>
                        <p>Description: {product.description}</p>
                        <button>Add To Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MainProductPage
