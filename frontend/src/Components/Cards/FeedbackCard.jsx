import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Rating from 'react-rating-stars-component'
import {useDispatch, useSelector} from 'react-redux'
import {setApiError, setFeedbackCard} from '../../redux/feedback/feedbackSlice'
import {CiStar} from 'react-icons/ci'
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
                `/api/feedback/fetchFeedback/${id}`,
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
        <div className="mt-8 p-4">
            <h2 className="text-3xl mt-8 mb-4 text-center font-semibold text-gray-800">
                Customer Feedback
            </h2>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : feedbackCard.length > 0 ? (
                    feedbackCard.map((feedbackItem) => (
                        <div
                            className="bg-white border border-gray-200 rounded-lg p-6 mb-6"
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
                                    <p className="font-semibold text-lg text-gray-900">
                                        {feedbackItem.userId
                                            ? feedbackItem.userId.username
                                            : 'User not found'}
                                    </p>
                                    <p className="text-sm text-gray-600">
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
                                size={30}
                                emptyIcon={<CiStar />}
                                halfIcon={
                                    <i className="fas fa-star-half-alt"></i>
                                }
                                fullIcon={<i className="fas fa-star"></i>}
                                activeColor="#FF9900"
                                edit={false}
                            />

                            <p className="text-gray-700 text-base mt-2">
                                {feedbackItem.comment}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-800">
                        No feedback available.
                    </p>
                )}
            </div>
        </div>
    )
}

export default FeedbackCard
