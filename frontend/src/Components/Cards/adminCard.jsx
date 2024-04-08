import {useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {setAdminCard, setApiError} from '../../redux/admin/adminSlice'
import {useDispatch, useSelector} from 'react-redux'

function AdminCard() {
    const dispatch = useDispatch()

    const {adminCard, apiError} = useSelector((state) => state.admin)

    useEffect(() => {
        fetchProduct()
    }, [])

    const approvedProduct = async (id) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/admin/validProduct/${id}`,
                {withCredentials: true},
            )
            if (response.status === 200) {
                toast.success('Product approved successfully')
                fetchProduct()
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    const notApprovedProduct = async (id) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/admin/notApproved/${id}`,
                {withCredentials: true},
            )
            if (response.status === 200) {
                toast.success('Product not approved')
                fetchProduct() // Fetch product data after not approval
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/product/showTempProduct',
                {withCredentials: true},
            )
            dispatch(setAdminCard(response.data.data))
        } catch (error) {
            console.error('Error fetching product:', error)
            dispatch(setApiError(error))
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h3 className="text-xl font-semibold mb-2">Products:</h3>
            <ul>
                {adminCard && adminCard.length > 0 ? (
                    adminCard.map((product) => (
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
                                    {/* Add more details as needed */}
                                </div>
                            </div>
                            <div className="flex">
                                <button
                                    onClick={() => approvedProduct(product._id)}
                                    className="bg-green-500 mr-[5px] text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() =>
                                        notApprovedProduct(product._id)
                                    }
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Not Approve
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No pending products found for an approval </p>
                )}
            </ul>
        </div>
    )
}

export default AdminCard
