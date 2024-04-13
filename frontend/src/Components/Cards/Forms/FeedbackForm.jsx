import axios from 'axios'
import {useParams} from 'react-router-dom'
import Rating from 'react-rating-stars-component'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {useState} from 'react'
import {setFeedbackCard} from '../../../redux/feedback/feedbackSlice'

function FeedbackForm() {
    const {id} = useParams()
    const [comment, setComment] = useState('')

    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(true)
    const {feedbackCard} = useSelector((state) => state.feedback)
    const dispatch = useDispatch()

    const ratingChanged = (newRating) => {
        setRating(newRating)
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
                dispatch(setFeedbackCard(feedbackResponse.data.data))
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error('Please Login')
            }
        }
    }
    return (
        <div>
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
                        className="border-black border rounded-md resize-none mb-4 p-2"
                        placeholder="Enter your comment here..."
                    />
                    <button className="bg-blue-500 w-40 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FeedbackForm
