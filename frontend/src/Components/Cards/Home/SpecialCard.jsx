import React, {useEffect, useState} from 'react'
import {FaStar, FaStarHalfAlt, FaRegStar, FaShare} from 'react-icons/fa'
import axios from 'axios'
import RatingCard from './../ChildCards/RatingCard'
import {toast} from 'react-toastify'
import {IoIosCart} from 'react-icons/io'
function SpecialCard() {
    const [products, setProducts] = useState([])
    const [currentImages, setCurrentImages] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/product/showLatestProducts')
            const products = response.data.data
            setProducts(products)

            if (products.length > 0) {
                setCurrentImages(products.map((product) => product.images[0]))
            }
        } catch (err) {
            console.error(err)
        }
    }

    const addToCart = async (productId) => {
        try {
            const response = await axios.get(
                `/api/product/addToCart/${productId}`,
                {withCredentials: true},
            )
            if (response.status === 203) {
                return toast.error('Product is out of stock')
            }
            // if (response.status === 204) {
            //     return toast.warn('Product has less stock')
            // }
            if (response.status === 200) {
                toast.success(response.data.message)
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error('Please Login')
            }
        }
    }
    const handleShare = async (product) => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: product.productName,
                    text: product.description,
                    url: `/showProduct/${product._id}`,
                })
            } else {
                throw new Error('Web Share API not supported')
            }
        } catch (error) {
            console.error('Error sharing:', error)
            toast.error('Error sharing product')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleImageHover = (index, image) => {
        const newCurrentImages = [...currentImages]
        newCurrentImages[index] = image
        setCurrentImages(newCurrentImages)
    }
    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase())
    }

    return (
        <div className="m-4 flex flex-wrap justify-center gap-6 sm:hidden lg:flex">
            {products.map((product, productIndex) => {
                const title = product.productName || ''
                const shortTitle = capitalizeWords(
                    title.split(' ').slice(0, 3).join(' '),
                )
                return (
                    <div
                        key={product._id}
                        className=" border-gray-100 h-[560px] bg-white rounded-[8px] w-[400px]"
                    >
                        <div
                            className=" w-full h-[50%] rounded-[8px] rounded-b-none"
                            style={{
                                backgroundImage: `url(${currentImages[productIndex]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        ></div>
                        <div className="flex justify-center max-w-full overflow-x-hidden p-2 mt-2 gap-2">
                            {product.images.slice(0, 4).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={product.name}
                                    className="border-[1px] w-[120px] object-contain rounded-[3px] h-[60px] "
                                    onClick={() =>
                                        handleImageHover(productIndex, image)
                                    }
                                    loading="lazy"
                                />
                            ))}
                        </div>
                        <div
                        // className="border-b-2 border-l-2 border-r-2 rounded-[8px] rounded-t-none border-gray-300"
                        >
                            <div className="mt-2 flex flex-col h-[100px] justify-evenly px-5">
                                <h1 className="text-xl">{shortTitle}</h1>
                                <h1 className="text-[1rem] font-semibold">
                                    ₹{product.price}
                                </h1>
                                <div className="mt-1">
                                    <RatingCard value={product} size={23} />
                                </div>
                            </div>
                            <div className="flex w-[100%] p-5 justify-between">
                                <button
                                    className=" w-[290px] rounded-[5px] text-white bg-blue-700 p-3"
                                    onClick={() => {
                                        addToCart(product._id)
                                    }}
                                >
                                    Add to Cart{' '}
                                </button>
                                <button
                                    className="bg-gray-300 px-5 rounded-[5px]"
                                    onClick={() => {
                                        handleShare(product)
                                    }}
                                >
                                    <FaShare />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SpecialCard
