import React, {useState, useEffect} from 'react'
import {setExploreCard} from '../../redux/explore/exploreSlice'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'

function PaginationFooter({pageCount}) {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchProduct(page)
    }, [page]) // Fetch products whenever the page changes

    const fetchProduct = async (page) => {
        setLoading(true)
        try {
            const response = await axios.get(
                `http://localhost:3000/api/product/fetchProduct?page=${page}`,
            )
            dispatch(setExploreCard(response.data.products))
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handlePrevious = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    const handleNext = () => {
        setPage((prevPage) => Math.min(prevPage + 1, pageCount))
    }

    return (
        <footer className="flex justify-between w-full mt-8">
            <button
                className="bg-gray-800 text-white px-4 py-2 rounded-sm disabled:opacity-50"
                disabled={page === 1 || loading}
                onClick={handlePrevious}
            >
                Previous
            </button>
            <button
                className="bg-gray-800 text-white px-4 py-2 rounded-sm disabled:opacity-50"
                disabled={page === pageCount || loading}
                onClick={handleNext}
            >
                Next
            </button>
        </footer>
    )
}

export default PaginationFooter
