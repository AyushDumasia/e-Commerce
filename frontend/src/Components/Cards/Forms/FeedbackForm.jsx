import React, {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import Rating from 'react-rating-stars-component'
import {useDispatch, useSelector} from 'react-redux'
import Avatar from 'react-avatar'
import {useParams} from 'react-router-dom'
import {setFeedbackCard} from '../../../redux/feedback/feedbackSlice'
import {
    setApiError,
    setProductCard,
} from '../../../redux/showProducts/showProductSlice'

function FeedbackForm() {
    const {id} = useParams()
    const [comment, setComment] = useState('')
    const {user} = useSelector((state) => state.user)
    const [rating, setRating] = useState(0)
    const dispatch = useDispatch()

    const ratingChanged = (newRating) => {
        setRating(newRating)
    }
    const fetchProductData = async () => {
        try {
            const response = await axios.get(`/api/product/showProduct/${id}`, {
                withCredentials: true,
            })
            // setLoading(false)
            dispatch(setProductCard(response.data.product))
        } catch (error) {
            dispatch(setApiError(error.message))
        }
    }

    const handleFeedback = async (e) => {
        e.preventDefault()

        if (rating === 0) {
            return toast.error('Select a rating')
        }

        try {
            const response = await axios.post(
                '/api/feedback/createFeedback',
                {productId: id, rating: rating, comment: comment},
                {withCredentials: true},
            )
            // const orders = localStorage.getItem('orders')
            // const addResponse = await axios.post(
            //     '/api/order/createOrder',
            //     {address: response, orders: orders},
            //     {
            //         withCredentials: true,
            //     },
            // )
            if (response.status === 200) {
                toast.success(response.data.message)
                setRating(0)
                setComment('')

                const feedbackResponse = await axios.get(
                    `/api/feedback/fetchFeedback/${id}`,
                    {withCredentials: true},
                )
                dispatch(setFeedbackCard(feedbackResponse.data.data))
            }
            fetchProductData()
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error('Please Login')
            }
        }
    }

    return (
        <div>
            <div className="mt-8 p-6">
                <h1 className="text-2xl font-semibold">Rate this product</h1>
                <form className="flex flex-col mt-4" onSubmit={handleFeedback}>
                    <div className="mb-4">
                        <Rating
                            key={rating}
                            name="rating"
                            count={5}
                            onChange={ratingChanged}
                            size={35}
                            value={rating}
                            activeColor="#ffd700"
                            isHalf={true}
                        />
                    </div>
                    <div className="flex align-middle justify-center">
                        <Avatar
                            name={user?.username || 'U'}
                            size={35}
                            round={true}
                            className="mt-[2px]"
                        />
                        <textarea
                            onChange={(e) => {
                                setComment(e.target.value)
                            }}
                            name="comment"
                            id="comment"
                            cols="30"
                            value={comment}
                            required
                            rows="1"
                            className="border-black w-[100%] active:border-none border-b resize-none mb-6 ml-4 p-2"
                            placeholder="Enter your comment here..."
                        />
                    </div>
                    <button className="bg-blue-500 w-40 text-white px-4 self-end py-2 rounded hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FeedbackForm
