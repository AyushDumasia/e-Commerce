import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Rating from 'react-rating-stars-component'
import {useDispatch, useSelector} from 'react-redux'
import {setApiError, setFeedbackCard} from '../../redux/feedback/feedbackSlice'
import Avatar from 'react-avatar'

function FeedbackCard() {
    const dispatch = useDispatch()
    const {feedbackCard} = useSelector((state) => state.feedback)
    const {id} = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFeedback(id)
    }, [id])

    const fetchFeedback = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/feedback/fetchFeedback/${id}`,
                {
                    withCredentials: true,
                },
            )
            dispatch(setFeedbackCard(response.data.data))
            setLoading(false)
        } catch (error) {
            dispatch(setApiError(error.message))
        }
    }

    return (
        <div className="mt-8">
            <h2 className="text-3xl mt-[50px]">Feedback</h2>
            <div className="mt-4">
                {loading ? (
                    <p>Loading...</p>
                ) : feedbackCard.length > 0 ? (
                    feedbackCard.map((feedbackItem) => (
                        <div
                            className="bg-[#fafafa] border-b border-black shadow-md rounded-lg p-6 mb-6"
                            key={feedbackItem._id}
                        >
                            <div className="flex items-center mb-4">
                                <Avatar
                                    name={feedbackItem.userId.username}
                                    size="40"
                                    round={true}
                                    className="mr-3"
                                />
                                <div>
                                    <p className="font-semibold text-lg">
                                        {feedbackItem.userId
                                            ? feedbackItem.userId.username
                                            : 'User not found'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Reviewed on{' '}
                                        {new Date(
                                            feedbackItem.createdAt,
                                        ).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <Rating
                                value={feedbackItem.rating}
                                count={5}
                                size={24}
                                activeColor="#FFA500"
                                edit={false}
                            />
                            <p className="text-gray-700 text-base mt-2">
                                {feedbackItem.comment}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No feedback available.</p>
                )}
            </div>
        </div>
    )
}

export default FeedbackCard
