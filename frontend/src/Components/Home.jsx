import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Rating from 'react-rating-stars-component'

import {useNavigate} from 'react-router-dom'

function Home() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [pagination, setPagination] = useState()

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

    const fetchProduct = async (page) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/product/fetchProduct?page=${page}`,
            )
            setProducts(response.data.products)
            setPagination(response.data.pagination)
            setPageCount(response.data.pagination.pageCount) // Update pageCount state
        } catch (error) {
            // console.error('Error fetching products:', error)
            toast.error(error.message)
        }
    }

    const showProduct = async (id) => {
        await axios.get(`http://localhost:3000/api/product/showProduct/${id}`)
        navigate(`/showProduct/${id}`)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="flex p-7">
            <ToastContainer />
            <div className="flex flex-col w-screen items-center">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="w-[80%] self-start bg-white flex h-[300px] p-4 mb-4 border border-gray-300 rounded-lg shadow-md cursor-pointer transition duration-300 hover:shadow-lg"
                        onClick={() => showProduct(product._id)}
                    >
                        <img
                            src={product.coverImage}
                            alt={product.productName}
                            className="w-[250px] h-[250px] object-cover rounded-lg mr-4"
                        />
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold mb-2">
                                    {product.productName}
                                </h1>
                                {/* <p className="text-gray-600 mb-2">
                                    {product.category}
                                </p> */}
                                <p className="text-gray-800 mb-2">
                                    {product.description}
                                </p>
                                <p className="text-gray-800 font-semibold">
                                    ₹{product.price}
                                </p>
                                <Rating
                                    value={product.rating}
                                    count={5}
                                    size={20}
                                    activeColor="orange"
                                    edit={false}
                                    isHalf={true}
                                />
                                {/* <p className="text-gray-700">
                                    {product.rating} {product.reviews}reviews
                                </p> */}
                            </div>
                            <div className="flex items-center  justify-between">
                                <div className="flex items-center"></div>
                            </div>
                        </div>
                    </div>
                ))}
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
        </div>
    )
}

export default Home
