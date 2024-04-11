import React, {useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {setAdminCard, setApiError} from '../../redux/admin/adminSlice'
import {useDispatch, useSelector} from 'react-redux'

const API_URL = 'http://localhost:3000/api'
const AdminCard = () => {
    const dispatch = useDispatch()
    const {adminCard, apiError} = useSelector((state) => state.admin)

    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/product/showTempProduct`,
                {withCredentials: true},
            )
            dispatch(setAdminCard(response.data.data))
        } catch (error) {
            handleApiError(error)
        }
    }

    const handleApiError = (error) => {
        console.error('API Error:', error)
        dispatch(setApiError(error))
        toast.error(error.message || 'Something went wrong')
    }

    const approveProduct = async (id) => {
        try {
            await axios.post(`${API_URL}/admin/validProduct/${id}`, {
                withCredentials: true,
            })
            fetchProduct()
            toast.success('Product approved successfully')
        } catch (error) {
            handleApiError(error)
        }
    }

    const rejectProduct = async (id) => {
        try {
            await axios.post(`${API_URL}/admin/notApproved/${id}`, {
                withCredentials: true,
            })
            toast.success('Product not approved')
            fetchProduct()
        } catch (error) {
            handleApiError(error)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
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
                                    src={product.coverImage}
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
