import React, {useState, useEffect} from 'react'
import {setExploreCard} from '../../redux/explore/exploreSlice'
import axios from 'axios'

import {useDispatch, useSelector} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'

function PaginationFooter() {
    const [pageCount, setPageCount] = useState(0)
    const dispatch = useDispatch()
    const [pagination, setPagination] = useState()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    const fetchProduct = async (page) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/product/fetchProduct?page=${page}`,
            )
            dispatch(setExploreCard(response.data.products))
            setPagination(response.data.pagination)
            setPageCount(response.data.pagination.pageCount)
            console.log(response.data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    const handlePrevious = () => {
        setPage((p) => {
            if (p === 1) return p
            fetchProduct(p - 1)
            return p - 1
        })
    }

    const handleNext = () => {
        setPage((p) => {
            if (p === pageCount) return p
            fetchProduct(p + 1)
            return p + 1
        })
    }
    return (
        <div>
            <footer className="flex justify-between w-full mt-8">
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-sm disabled:opacity-50"
                    disabled={page === 1}
                    onClick={handlePrevious}
                >
                    Previous
                </button>
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-sm disabled:opacity-50"
                    disabled={page === pageCount}
                    onClick={handleNext}
                >
                    Next
                </button>
            </footer>
        </div>
    )
}

export default PaginationFooter
