import React, {useState, useEffect} from 'react'
import {setExploreCard} from '../../redux/explore/exploreSlice'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'
import {useNavigate, useParams, useLocation} from 'react-router'
import {GrLinkNext} from 'react-icons/gr'
import {GrLinkPrevious} from 'react-icons/gr'

function PaginationFooter({pageCount}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {page} = useParams()
    const currentPage = parseInt(page) || 1
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        fetchProduct(currentPage)
    }, [currentPage])

    const fetchProduct = async (page) => {
        setLoading(true)
        try {
            const response = await axios.get(
                `/api/product/fetchProduct?page=${page}`,
            )
            dispatch(setExploreCard(response.data.products))
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handlePageChange = (pageNum) => {
        navigate(`/explore/${pageNum}`)
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            navigate(`/explore/${currentPage - 1}`)
        }
    }

    const handleNext = () => {
        if (currentPage < pageCount) {
            navigate(`/explore/${currentPage + 1}`)
        }
    }

    return (
        <footer className="flex justify-center w-full p-8 ">
            <div className="flex space-x-2">
                <button
                    className={`px-4 w-[150px] flex justify-evenly items-center py-2 rounded-sm text-black ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={currentPage === 1 || loading}
                    onClick={handlePrevious}
                >
                    <GrLinkPrevious />
                    Previous
                </button>
                {Array.from({length: pageCount}, (_, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 rounded-sm ${
                            location.pathname === `/explore/${i + 1}`
                                ? 'bg-[#0000ff] rounded-sm border border-black text-white'
                                : 'text-black'
                        } disabled:opacity-50`}
                        disabled={loading}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className={`px-4 w-[100px] flex justify-evenly items-center py-2 rounded-sm text-black ${
                        currentPage === pageCount
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                    }`}
                    disabled={currentPage === pageCount || loading}
                    onClick={handleNext}
                >
                    Next
                    <GrLinkNext />
                </button>
            </div>
        </footer>
    )
}

export default PaginationFooter
