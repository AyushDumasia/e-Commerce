import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {setAdminCard, setApiError} from '../../redux/admin/adminSlice'
import {useDispatch, useSelector} from 'react-redux'
import ReactLoading from 'react-loading'

const API_URL = 'http://localhost:3000/api'

const AdminCard = () => {
    const dispatch = useDispatch()
    const {adminCard, apiError} = useSelector((state) => state.admin)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                `${API_URL}/product/showTempProduct`,
                {withCredentials: true},
            )
            dispatch(setAdminCard(response.data.data))
        } catch (error) {
            handleApiError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleApiError = (error) => {
        dispatch(setApiError(error))
        toast.error(error.message || 'Something went wrong')
    }

    const approveProduct = async (id) => {
        setLoading(true)
        try {
            await axios.post(
                `${API_URL}/admin/validProduct/${id}`,
                {},
                {
                    withCredentials: true,
                },
            )
            toast.success('Product is approved')
            fetchProduct()
        } catch (error) {
            setApiError(error)
        } finally {
            setLoading(false)
        }
    }

    const rejectProduct = async (id) => {
        setLoading(true)
        try {
            await axios.post(
                `${API_URL}/admin/notApproved/${id}`,
                {},
                {
                    withCredentials: true,
                },
            )
            toast.success('Product not approved')
            fetchProduct()
        } catch (error) {
            handleApiError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {loading && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center">
                    <div className="bg-gray-900 bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                    <ReactLoading
                        type={'spin'}
                        color={'#123456'}
                        height={50}
                        width={50}
                    />
                </div>
            )}
            <h3 className="text-xl font-semibold mb-2">Pending Products:</h3>
            {adminCard && adminCard.length > 0 ? (
                <ul>
                    {adminCard.map((product) => (
                        <li
                            key={product._id}
                            className="flex items-center justify-between border-b border-gray-200 py-4"
                        >
                            <div className="flex items-center">
                                <img
                                    src={product?.images[0]}
                                    alt={product.productName}
                                    className="w-28 h-28 object-contain mr-4"
                                />
                                <div>
                                    <h4 className="text-lg font-semibold">
                                        {product.productName}
                                    </h4>
                                    <p className="text-gray-600">
                                        Description: {product.description}
                                    </p>
                                    <p className="text-gray-600">
                                        Price: ₹{product.price}
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <button
                                    onClick={() => approveProduct(product._id)}
                                    className="bg-green-500 mr-2 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => rejectProduct(product._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pending products found for approval.</p>
            )}
        </div>
    )
}

export default AdminCard
