import axios from 'axios'
import Rating from 'react-rating-stars-component'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {setExploreCard} from '../../redux/explore/exploreSlice'
import {toast} from 'react-toastify'
import PaginationFooter from '../Footer/PaginationFooter'
import VerticalBar from './VerticalBar'
import {motion, AnimatePresence} from 'framer-motion'
import LoadingComponent from './LoadingComponent'
import RatingCard from './ChildCards/RatingCard'

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
                `/api/product/fetchProduct?page=${page}`,
            )
            dispatch(setExploreCard(response.data.products))
            setPagination(response.data.pagination)
            setPageCount(response.data.pagination.pageCount)
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
                `/api/product/addToCart/${productId}`,
                {withCredentials: true},
            )
            if (response.status === 203) {
                return toast.error('Product is out of stock')
            }
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
        await axios.get(`/api/product/showProduct/${id}`)
        navigate(`/showProduct/${id}`)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="overflow-hidden flex">
            <div className="sticky top-0 h-screen">
                <VerticalBar />
            </div>
            <AnimatePresence>
                <div className="flex flex-col w-screen h-auto  items-center">
                    {loading ? (
                        <LoadingComponent />
                    ) : (
                        exploreCard?.map((product, index) => (
                            <motion.div
                                key={product._id}
                                className="w-[100%] self-start  flex  max-h-[350px] h-[300px] p-4 bg-white mb-[4px] rounded-md cursor-pointer transition duration-300"
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -50}}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                onClick={() => showProduct(product._id)}
                            >
                                <div
                                    className="image-container w-[250px] h-auto rounded-md mr-4"
                                    style={{
                                        backgroundImage: `url(${product?.images[0]})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                ></div>

                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h1 className="text-[20px] font-medium mb-2">
                                            {product.productName
                                                .split(' ')
                                                .slice(0, 7)
                                                .join(' ')}
                                        </h1>

                                        <p className="text-gray-800 font-semibold">
                                            ₹{product.price}
                                        </p>
                                        <div className="flex my-2  items-center">
                                            <RatingCard
                                                value={product}
                                                size={20}
                                            />
                                            &nbsp;
                                            <span>
                                                ({product.rating.toFixed(1)})
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                addCart(product._id, e)
                                            }}
                                            className="text-red hover:before:bg-greenborder-green-500 relative h-[40px] w-280 overflow-hidden border border-green-500 bg-white px-3 text-green-500 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-green-500 before:transition-all before:duration-500 hover:text-white hover:shadow-green-500 hover:before:left-0 hover:before:w-full text-sm mt-[10px] justify-end align-baseline rounded-[5px]"
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
