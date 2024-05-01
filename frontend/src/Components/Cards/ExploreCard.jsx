import axios from 'axios'
import Rating from 'react-rating-stars-component'
import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import React, {useState, useEffect} from 'react'
import {setExploreCard} from '../../redux/explore/exploreSlice'
import {ToastContainer, toast} from 'react-toastify'
import PaginationFooter from '../Footer/PaginationFooter'
import VerticalBar from './VerticalBar'
import {motion, AnimatePresence} from 'framer-motion'

function ExploreCard() {
    const dispatch = useDispatch()
    const {exploreCard, apiError} = useSelector((state) => state.explore)
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState()
    const [pageCount, setPageCount] = useState(0)

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

    const addCart = async (productId, e) => {
        e.stopPropagation()
        try {
            const response = await axios.get(
                `http://localhost:3000/api/product/addToCart/${productId}`,
                {withCredentials: true},
            )
            if (response.status === 200) {
                toast.success(response.data.message)
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error('Please Login')
            }
        }
    }

    const showProduct = async (id) => {
        await axios.get(`/product/showProduct/${id}`)
        navigate(`/showProduct/${id}`)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="overflow-hidden flex">
            <VerticalBar />
            <AnimatePresence>
                <div className="flex flex-col w-screen h-auto  items-center">
                    {loading ? (
                        <div className="w-full flex justify-center items-center h-96">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        exploreCard?.map((product, index) => (
                            <motion.div
                                key={product._id}
                                className="w-[100%] self-start bg-[#fafafa] flex  max-h-[350px] h-[300px] p-4 mb-4 rounded-lg shadow-md cursor-pointer transition duration-300 hover:shadow-lg"
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -50}}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                onClick={() => showProduct(product._id)}
                            >
                                <img
                                    src={product?.images[0]}
                                    alt={product.productName}
                                    className="w-[250px] h-[250px] object-cover rounded-lg mr-4"
                                    loading="lazy"
                                />

                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h1 className="text-[20px] font-medium mb-2">
                                            {product.productName}
                                        </h1>
                                        <p className="text-gray-800 font-semibold">
                                            ₹{product.price}
                                        </p>
                                        <Rating
                                            value={product.rating}
                                            count={5}
                                            size={25}
                                            activeColor="orange"
                                            edit={false}
                                            isHalf={true}
                                        />
                                        <button
                                            onClick={(e) => {
                                                addCart(product._id, e)
                                            }}
                                            className="text-red hover:before:bg-greenborder-green-500 relative h-[40px] w-280 overflow-hidden border border-green-500 bg-white px-3 text-green-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-green-500 before:transition-all before:duration-500 hover:text-white hover:shadow-green-500 hover:before:left-0 hover:before:w-full text-sm mt-[10px] justify-end align-baseline rounded-[5px]"
                                        >
                                            <span className="relative z-10">
                                                Add to Cart
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}

                    <PaginationFooter pageCount={pageCount} />
                </div>
            </AnimatePresence>
        </div>
    )
}

export default ExploreCard
