import axios from 'axios'
import Rating from 'react-rating-stars-component'
import {useNavigate} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import {useDispatch, useSelector} from 'react-redux'
import React, {useState, useEffect} from 'react'
import {setExploreCard} from '../../redux/explore/exploreSlice'
import {ToastContainer, toast} from 'react-toastify'
import PaginationFooter from '../Footer/PaginationFooter'

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

    const showProduct = async (id) => {
        await axios.get(`/product/showProduct/${id}`)
        navigate(`/showProduct/${id}`)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="overflow-hidden">
            <div className="flex flex-col w-screen items-center">
                {loading
                    ? Array.from({length: 5}).map((_, index) => (
                          <div
                              key={index}
                              className="w-[80%] self-start bg-white flex h-[300px] p-4 mb-4 border border-gray-300 rounded-lg shadow-md cursor-pointer transition duration-300 hover:shadow-lg"
                          >
                              <Skeleton
                                  width={250}
                                  height={250}
                                  className="rounded-lg mr-4 skeleton-image"
                              />
                              <div className="flex flex-col justify-between w-full">
                                  <Skeleton
                                      height={20}
                                      width={150}
                                      className="mb-2 skeleton-title"
                                  />
                                  <Skeleton
                                      height={20}
                                      width={200}
                                      className="mb-2 skeleton-description"
                                      count={2}
                                  />
                                  <Skeleton
                                      height={20}
                                      width={100}
                                      className="mb-2 skeleton-price"
                                  />
                              </div>
                          </div>
                      ))
                    : exploreCard.map((product) => (
                          <div
                              key={product._id}
                              className="w-[80%] self-start bg-white flex h-[300px] p-4 mb-4 border border-gray-300 rounded-lg shadow-md cursor-pointer transition duration-300 hover:shadow-lg"
                              onClick={() => showProduct(product._id)}
                          >
                              <img
                                  src={product.coverImage}
                                  alt={product.productName}
                                  className="w-[250px] h-[250px] object-cover rounded-lg mr-4"
                                  loading="lazy"
                              />

                              <div className="flex flex-col justify-between">
                                  <div>
                                      <h1 className="text-2xl font-semibold mb-2">
                                          {product.productName}
                                      </h1>
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
                                  </div>
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    )
}

export default ExploreCard
