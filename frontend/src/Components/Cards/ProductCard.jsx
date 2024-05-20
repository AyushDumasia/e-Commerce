// ProductCard.js
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {FaShare} from 'react-icons/fa'
import {
    setApiError,
    setProductCard,
} from '../../redux/showProducts/showProductSlice'
import LoadingComponent from './LoadingComponent'

function ProductCard() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const {showProductCard, apiError} = useSelector(
        (state) => state.productCard,
    )
    const [currentImage, setCurrentImage] = useState()
    const [sidebarImages, setSidebarImages] = useState([])

    useEffect(() => {
        fetchProductData()
    }, [id])

    useEffect(() => {
        if (showProductCard) {
            setSidebarImages(showProductCard.images)
            setCurrentImage(showProductCard.images[0])
        }
    }, [showProductCard])

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`/api/product/showProduct/${id}`, {
                withCredentials: true,
            })
            setLoading(false)
            dispatch(setProductCard(response.data.product))
        } catch (error) {
            dispatch(setApiError(error.message))
        }
    }

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: showProductCard.productName,
                    text: showProductCard.description,
                    url: window.location.href,
                })
            } else {
                throw new Error('Web Share API not supported')
            }
        } catch (error) {
            console.error('Error sharing:', error)
            toast.error('Error sharing product')
        }
    }

    const addCart = async (productId) => {
        try {
            const response = await axios.get(
                `/api/product/addToCart/${productId}`,
                {
                    withCredentials: true,
                },
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

    const handlePreviewClick = (image) => {
        setCurrentImage(image)
    }

    return (
        <div className="p-4  rounded-sm">
            {loading ? (
                <div className="mt-[100px] overflow-x-hidden ml-[50px] w-[100%]">
                    <LoadingComponent />
                </div>
            ) : showProductCard ? (
                <div className="flex flex-col md:flex-row ">
                    <div className="flex flex-col items-center mr-4">
                        {sidebarImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Preview ${index + 1}`}
                                className={`w-16 h-16 mb-2 cursor-pointer border border-gray-300  ${
                                    currentImage === image
                                        ? 'border-blue-500 border-[2px]'
                                        : ''
                                }`}
                                onMouseEnter={() => handlePreviewClick(image)}
                            />
                        ))}
                    </div>
                    <div className="w-full md:w-1/2 flex mr-2 justify-center relative ">
                        <img
                            src={currentImage}
                            alt={showProductCard.productName}
                            className="w-full max-h-[500px] object-contain mb-4 rounded-lg"
                        />
                        {/* <button
                            className="absolute top-0 right-3 mt-4 mr-4 rounded-full p-2 shadow-md text-white bg-[#00000045]"
                            onClick={handleShare}
                        >
                            <FaShare />{' '}
                        </button> */}
                    </div>
                    <div className="flex-1 pl-4 ">
                        <h2 className="text-2xl font-bold mb-4">
                            {showProductCard.productName}
                        </h2>
                        <p className="text-xl mb-4">
                            {showProductCard.category}
                        </p>
                        <p className="text-sm mb-4">
                            {showProductCard.description}
                        </p>
                        <p className="text-lg font-bold mb-4">
                            ₹{showProductCard.price}
                        </p>

                        <div className="flex items-center">
                            <button
                                onClick={() => addCart(showProductCard._id)}
                                className="text-black  border-black border  px-6 py-3 mr-4 rounded"
                            >
                                Add to Cart
                            </button>
                            <button className="text-white bg-green-500 border border-green-500 px-6 py-3 mr-4 rounded hover:bg-green-600">
                                Buy Now
                            </button>
                            <button
                                onClick={handleShare}
                                className="bg-gray-300 p-4 rounded-sm"
                            >
                                <FaShare />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No product found with ID: {id}</p>
            )}
        </div>
    )
}

export default ProductCard
