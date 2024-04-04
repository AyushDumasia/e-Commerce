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
            console.error('Error fetching products:', error)
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
            <div className="flex flex-col w-screen item-center">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="w-[80%]  self-start bg-[#d9dfe4] flex h-[300px] p-4 mb-4 border-black border-b"
                        onClick={() => showProduct(product._id)}
                    >
                        <img
                            src={product.coverImage}
                            alt=""
                            className="w-[250px] h-[250px] object-contain rounded-lg mx-4"
                        />
                        <div>
                            <h1 className=" text-4xl font-semibold mb-2">
                                {product.productName}
                            </h1>
                            <Rating
                                value={product.rating}
                                count={5}
                                size={30}
                                activeColor="orange"
                                edit={false}
                                isHalf={true}
                            />
                            <p className=" mb-2">{product.category}</p>
                            <p className=" mb-2">{product.description}</p>
                            <p className=" mb-2"> ₹{product.price}</p>
                        </div>
                    </div>
                ))}
                <footer className="flex justify-between">
                    <button
                        className="bg-[#000000] text-[white] p-[5px] rounded-sm"
                        disabled={page === 1}
                        onClick={handlePrevious}
                    >
                        Previous
                    </button>
                    <button
                        className="bg-[#000000] text-[white] p-[5px] rounded-sm"
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
