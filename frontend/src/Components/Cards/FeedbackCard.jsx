import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Rating from 'react-rating-stars-component'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {setApiError, setFeedbackCard} from '../../redux/feedback/feedbackSlice'

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
            <h1 className="text-2xl font-semibold">Feedback</h1>
            <div className="mt-4">
                {loading ? (
                    <p>Loading...</p>
                ) : feedbackCard.length > 0 ? (
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
    )
}

export default FeedbackCard
