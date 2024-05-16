import React, {useState, useEffect} from 'react'
import {setExploreCard} from '../../redux/explore/exploreSlice'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router'

function PaginationFooter({pageCount}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {page} = useParams()
    const currentPage = parseInt(page) || 1
    const dispatch = useDispatch()

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

    const handlePrevious = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1
            navigate(`/explore/${prevPage}`)
        }
    }

    const handleNext = () => {
        if (currentPage < pageCount) {
            const nextPage = currentPage + 1
            navigate(`/explore/${nextPage}`)
        }
    }

    return (
        <footer className="flex justify-between w-full mt-8">
            <button
                className="bg-gray-800 text-white px-4 py-2 rounded-sm disabled:opacity-50"
                disabled={currentPage === 1 || loading}
                onClick={handlePrevious}
            >
                Previous
            </button>
            <button
                className="bg-gray-800 text-white px-4 py-2 rounded-sm disabled:opacity-50"
                disabled={currentPage === pageCount || loading}
                onClick={handleNext}
            >
                Next
            </button>
        </footer>
    )
}

export default PaginationFooter
