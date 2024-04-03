import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Rating from 'react-rating-stars-component'

function ShowInfo() {
    const [feedback, setFeedback] = useState(null)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const ratingChanged = (newRating) => {
        setRating(newRating) // Update the rating state when it changes
    }

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

    const handleFeedback = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:3000/api/feedback/createFeedback',
                {
                    productId: id,
                    rating: rating,
                    comment: comment,
                },
                {withCredentials: true},
            )
            console.log('Feedback submitted successfully:', response.data)
        } catch (err) {
            console.error('Error submitting feedback:', err)
        }
    }

    const fetchFeedback = async (id) => {
        console.log('ID :', id)
        const response = await axios.get(
            `http://localhost:3000/api/feedback/fetchFeedback/${id}`,
            {withCredentials: true},
        )
        console.log(response)
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
        fetchFeedback(id)
        fetchProduct()
    }, [id])

    return (
        <div className="container mx-auto px-4 py-8">
            {loading ? (
                <p>Loading...</p>
            ) : product ? (
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:mr-12  md:mb-0">
                        <div className="mb-6 h-1/2 bg-blue-500">
                            <img
                                src={product.coverImage}
                                alt={product.productName}
                                className="w-64 h-auto mb-4"
                            />
                        </div>
                        <h2 className="text-xl font-semibold">
                            {product.productName}
                        </h2>
                    </div>
                    <div className="flex-1 self-start">
                        <p className="text-lg mb-4">{product.category}</p>
                        <p className="text-lg mb-4">{product.description}</p>
                        <p className="text-lg mb-4">{product.price}</p>
                        <div className="flex flex-col ">
                            <button
                                onClick={() => {
                                    addCart(product._id)
                                }}
                                className="bg-blue-500 w-36 text-white px-4 py-2 my-1 rounded hover:bg-blue-600"
                            >
                                Add to Cart
                            </button>
                            <button className="bg-blue-500 w-40 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No product found with ID: {id}</p>
            )}

            <h1>Rate this</h1>
            <form className="flex flex-col" onSubmit={handleFeedback}>
                <div className="mb-4">
                    <Rating
                        name="rating"
                        count={5}
                        onChange={ratingChanged}
                        size={35}
                        activeColor="#ffd700"
                    />
                </div>
                <textarea
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                    name="comment"
                    id="comment"
                    cols="30"
                    value={comment}
                    rows="10"
                    className="border-black resize-none w-1/4 mb-4 p-2"
                    placeholder="Enter your comment here..."
                />
                <button className="bg-blue-500 w-40 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ShowInfo
