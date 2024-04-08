import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Rating from 'react-rating-stars-component'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {
    setApiError,
    setProductCard,
} from '../../redux/showProducts/showProductSlice'
function ProductCard() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const [loading, setLoading] = useState(true)

    const {showProductCard, apiError} = useSelector(
        (state) => state.productCard,
    )

    useEffect(() => {
        fetchProductData()
    }, [id])

    const fetchProductData = async () => {
        axios
            .get(`http://localhost:3000/api/product/showProduct/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                setLoading(false)
                dispatch(setProductCard(response.data.product))
            })
            .catch((error) => {
                dispatch(setApiError(error.message))
            })
    }

    const addCart = async (productId) => {
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
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : showProductCard ? (
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:mr-12 md:mb-0 w-full md:w-1/2">
                        <img
                            src={showProductCard.coverImage}
                            alt={showProductCard.productName}
                            className="w-full h-auto mb-4 rounded-lg"
                        />
                    </div>
                    <div className="flex-1 self-start md:pl-12">
                        <h2 className="text-3xl font-bold mb-4">
                            {showProductCard.productName}
                        </h2>
                        <p className="text-xl mb-4">
                            {showProductCard.category}
                        </p>
                        <p className="text-lg mb-4">
                            {showProductCard.description}
                        </p>
                        <p className="text-xl font-bold mb-4">
                            ₹{showProductCard.price}
                        </p>
                        <div className="flex flex-col md:flex-row">
                            <button
                                onClick={() => {
                                    addCart(showProductCard._id)
                                }}
                                className="bg-blue-500 text-white px-6 py-3 my-2 md:mr-4 rounded hover:bg-blue-600"
                            >
                                Add to Cart
                            </button>
                            <button className="bg-blue-500 text-white px-6 py-3 my-2 md:mr-4 rounded hover:bg-blue-600">
                                Buy Now
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
