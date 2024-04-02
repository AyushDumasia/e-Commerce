import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useNavigate} from 'react-router-dom'

function Home() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/product/fetchProduct',
            )
            setProducts(response.data.data)
            // if (Array.isArray(response.data)) {
            //     setProducts(response.data)
            // } else {
            //     console.error('Invalid response format:', response.data)
            // }
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const showProduct = async (id) => {
        const product = await axios.get(
            `http://localhost:3000/api/product/showProduct/${id}`,
        )
        console.log(product)
        navigate(`/showProduct/${id}`)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="flex bg-slate-400">
            <ToastContainer />
            <div className="flex flex-row flex-wrap">
                {products.map((product) => (
                    <div
                        onClick={() => {
                            showProduct(product._id)
                        }}
                        key={product._id}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4"
                    >
                        <div className="bg-slate-700 rounded-lg p-4">
                            <img
                                src={product.coverImage}
                                alt=""
                                className="w-full h-auto rounded-lg mb-4"
                            />
                            <h3 className="text-white text-lg font-semibold mb-2">
                                {product.name}
                            </h3>
                            <p className="text-gray-300 mb-2">
                                Category: {product.category}
                            </p>
                            <p className="text-gray-300 mb-2">
                                Description: {product.description}
                            </p>
                            <p className="text-gray-300 mb-2">
                                Price: {product.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
