import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ToastContainer} from 'react-toastify'
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
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const showProduct = async (id) => {
        await axios.get(`http://localhost:3000/api/product/showProduct/${id}`)
        navigate(`/showProduct/${id}`)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="flex p-7">
            <ToastContainer />
            <div className="flex flex-col w-screen items-center">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="w-11/12 self-start bg-amber-100 flex rounded-lg p-4 mb-4"
                        onClick={() => showProduct(product._id)}
                    >
                        <img
                            src={product.coverImage}
                            alt=""
                            className="w-80 h-80 object-contain rounded-lg mx-4"
                        />
                        <div>
                            <h3 className=" text-lg font-semibold mb-2">
                                {product.productName}
                            </h3>
                            <p className=" mb-2">
                                Category: {product.category}
                            </p>
                            <p className=" mb-2">
                                Description: {product.description}
                            </p>
                            <p className=" mb-2">Price: {product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
