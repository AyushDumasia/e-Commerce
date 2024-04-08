import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Rating from 'react-rating-stars-component'
import CustomToastContainer from './Toast/CustomToastContainer'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {setProductCard} from '../redux/showProducts/showProductSlice'
import {setFeedbackCard} from '../redux/feedback/feedbackSlice'
function ShowInfo() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {showProductCard, apiError} = useSelector(
        (state) => state.productCard,
    )

    const {feedbackCard} = useSelector((state) => state.feedback)

    // const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    // const [feedback, setFeedback] = useState([])
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productResponse, feedbackResponse] = await Promise.all([
                    axios.get(
                        `http://localhost:3000/api/product/showProduct/${id}`,
                        {withCredentials: true},
                    ),
                    axios.get(
                        `http://localhost:3000/api/feedback/fetchFeedback/${id}`,
                        {withCredentials: true},
                    ),
                ])
                dispatch(setProductCard(productResponse.data.product))
                console.log(feedbackResponse.data.data)
                dispatch(setFeedbackCard(feedbackResponse.data.data))
                setLoading(false)
            } catch (error) {
                // console.error('Error fetching data:', error)
                toast.error(error.message)
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    const addCart = async (productId) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/product/addToCart/${productId}`,
                {withCredentials: true},
            )
            if (response.status === 200) {
                toast.success(response.data.message)
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error('Please Login')
            }
        }
    }

    const handleFeedback = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:3000/api/feedback/createFeedback',
                {productId: id, rating: rating, comment: comment},
                {withCredentials: true},
            )
            if (response.status === 200) {
                toast.success(response.data.message)
                setRating(0)
                setComment('')
                const feedbackResponse = await axios.get(
                    `http://localhost:3000/api/feedback/fetchFeedback/${id}`,
                    {withCredentials: true},
                )
                setFeedback(feedbackResponse.data.data)
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error('Please Login')
            }
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <CustomToastContainer />
            {loading ? (
                <p>Loading...</p>
            ) : showProductCard ? (
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:mr-12 md:mb-0 w-full md:w-1/2">
                        <img
                            src={showProductCard.coverImage}
                            alt={showProductCard.productName}
                            className="w-full h-auto mb-4 rounded-lg"
                        />
                    </div>
                    <div className="flex-1 self-start md:pl-12">
                        <h2 className="text-3xl font-bold mb-4">
                            {showProductCard.productName}
                        </h2>
                        <p className="text-xl mb-4">
                            {showProductCard.category}
                        </p>
                        <p className="text-lg mb-4">
                            {showProductCard.description}
                        </p>
                        <p className="text-xl font-bold mb-4">
                            ₹{showProductCard.price}
                        </p>
                        <div className="flex flex-col md:flex-row">
                            <button
                                onClick={() => {
                                    addCart(showProductCard._id)
                                }}
                                className="bg-blue-500 text-white px-6 py-3 my-2 md:mr-4 rounded hover:bg-blue-600"
                            >
                                Add to Cart
                            </button>
                            <button className="bg-blue-500 text-white px-6 py-3 my-2 md:mr-4 rounded hover:bg-blue-600">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No product found with ID: {id}</p>
            )}
            <div className="mt-8">
                <h1 className="text-2xl font-semibold">Rate this product</h1>
                <form className="flex flex-col mt-4" onSubmit={handleFeedback}>
                    <div className="mb-4">
                        <Rating
                            name="rating"
                            count={5}
                            onChange={ratingChanged}
                            size={35}
                            activeColor="#ffd700"
                            isHalf={true}
                            required
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
                        required
                        rows="10"
                        className="border-black resize-none mb-4 p-2"
                        placeholder="Enter your comment here..."
                    />
                    <button className="bg-blue-500 w-40 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
            <div className="mt-8">
                <h1 className="text-2xl font-semibold">Feedback</h1>
                <div className="mt-4">
                    {feedbackCard > 0 ? (
                        feedbackCard.map((feedbackItem) => (
                            <div
                                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                key={feedbackItem._id}
                            >
                                <p className="font-semibold text-lg mb-2">
                                    {feedbackItem.userId
                                        ? feedbackItem.userId.username
                                        : 'User not found'}
                                </p>
                                <div className="flex items-center">
                                    <p className="text-blue-500 text-base">
                                        Reviewed on:{' '}
                                        {new Date(
                                            feedbackItem.createdAt,
                                        ).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>

                                <Rating
                                    value={feedbackItem.rating}
                                    count={5}
                                    size={30}
                                    activeColor="orange"
                                    edit={false}
                                    isHalf={true}
                                />
                                <p className="text-gray-700  text-xl-base ">
                                    {feedbackItem.comment}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No feedback available.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowInfo
