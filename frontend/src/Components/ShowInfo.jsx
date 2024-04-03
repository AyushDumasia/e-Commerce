import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function ShowInfo() {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const addCart = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/product/addToCart/${id}`,
                {withCredentials: true},
            )
            console.log('Product added to cart:', response.data)
        } catch (err) {
            console.log('Error adding product to cart:', err)
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/product/showProduct/${id}`,
                    null,
                    {withCredentials: true},
                )
                setProduct(response.data.product)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching product details:', error)
            }
        }

        fetchProduct()
    }, [id])

    return (
        <div style={{textAlign: 'center', padding: '20px'}}>
            {loading ? (
                <p>Loading...</p>
            ) : product ? (
                <div
                    style={{
                        display: 'flex',
                        maxWidth: '800px',
                        margin: '0 auto',
                    }}
                >
                    <div style={{marginRight: '20px'}}>
                        <img
                            src={product.coverImage}
                            alt={product.productName}
                            style={{
                                width: '300px',
                                height: 'auto',
                                marginBottom: '20px',
                            }}
                        />
                        <h2 style={{textAlign: 'left', marginBottom: '0'}}>
                            {product.productName}
                        </h2>
                    </div>
                    <div style={{flex: 1, textAlign: 'left'}}>
                        <p style={{fontSize: '18px', marginBottom: '10px'}}>
                            Category: {product.category}
                        </p>
                        <p style={{marginBottom: '10px'}}>
                            Description: {product.description}
                        </p>
                        <p style={{marginBottom: '10px'}}>
                            Price: {product.price}
                        </p>
                        <p>{product._id}</p>
                        {/* Add more product details as needed */}
                    </div>
                    <button
                        onClick={() => {
                            addCart(product._id)
                        }}
                        className="bg-slate-600"
                    >
                        Add to cart
                    </button>
                </div>
            ) : (
                <p>No product found with ID: {id}</p>
            )}
        </div>
    )
}

export default ShowInfo
