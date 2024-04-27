import React, {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReactLoading from 'react-loading'
import Input from './../../Input/Input'
import Button from './../../Button/Button'
import CustomToastContainer from './../../Toast/CustomToastContainer'
import {IoHome} from 'react-icons/io5'
import {useNavigate} from 'react-router'

function CreateProduct() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        description: '',
        price: 0,
        stock: 0,
    })
    const [selectedFiles, setSelectedFiles] = useState([])
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        setSelectedFiles([...selectedFiles, ...files])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formDataWithFiles = new FormData()
            formDataWithFiles.append('productName', formData.productName)
            formDataWithFiles.append('category', formData.category)
            formDataWithFiles.append('description', formData.description)
            formDataWithFiles.append('price', formData.price)
            formDataWithFiles.append('stock', formData.stock)
            for (const file of selectedFiles) {
                formDataWithFiles.append('images', file)
            }

            const response = await axios.post(
                'http://localhost:3000/api/product/createProduct',
                formDataWithFiles,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )

            if (response.status === 200) {
                toast.success('Product created successfully')
            }

            setFormData({
                productName: '',
                category: '',
                description: '',
                price: '',
                stock: '',
            })
            setSelectedFiles([])
        } catch (error) {
            console.error('Error:', error)
            toast.error('An error occurred. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-y-hidden">
            <CustomToastContainer />
            {loading && (
                <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <ReactLoading
                        type={'spin'}
                        color={'#123456'}
                        height={50}
                        width={50}
                    />
                </div>
            )}
            <div className="flex flex-col justify-center items-start w-[450px] bg-white p-8 rounded-lg shadow-lg overflow-y-hidden">
                <div className="flex mb-3  w-[80%] justify-between">
                    <h2 className="text-2xl  justify-between font-semibold">
                        Create Product
                    </h2>
                    <button
                        className="p-2 rounded-full border-black border "
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        <IoHome />
                    </button>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label
                        className="block mb-2 text-gray-700"
                        htmlFor="productName"
                    >
                        Product Name:
                    </label>
                    <Input
                        type={'text'}
                        name={'productName'}
                        placeholder={'Product Name'}
                        value={formData.productName}
                        handler={handleChange}
                        required
                    />
                    <label
                        className="block mt-4 mb-2 text-gray-700"
                        htmlFor="images"
                    >
                        Images:
                    </label>
                    <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple
                        className="mb-4"
                    />
                    <label
                        className="block mb-2 text-gray-700"
                        htmlFor="productName"
                    >
                        Stock :
                    </label>
                    <Input
                        type={'text'}
                        name={'stock'}
                        placeholder={'Stock'}
                        value={formData.stock}
                        handler={handleChange}
                        required
                    />
                    <div className="mb-4">
                        <label
                            className="block mb-2 text-gray-700"
                            htmlFor="category"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            value={formData.category}
                            name={'category'}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        >
                            <option value="" disabled hidden>
                                Select Category
                            </option>
                            <option value="Electronics">Electronics</option>
                            <option value="Home & Kitchen">
                                Home & Kitchen
                            </option>
                            <option value="Books">Books</option>
                            <option value="Health & Personal Care">
                                Health & Personal Care
                            </option>
                            <option value="Beauty & Personal Care">
                                Beauty & Personal Care
                            </option>
                            <option value="Toys & Games">Toys & Games</option>
                            <option value="Sports & Outdoors">
                                Sports & Outdoors
                            </option>
                            <option value="Food">Food</option>
                            <option value="pickles and Papad">
                                Pickles and Papad
                            </option>
                            <option value="Clothing & Accessories">
                                Clothing & Accessories
                            </option>
                        </select>
                    </div>
                    <label
                        className="block mb-2 text-gray-700"
                        htmlFor="description"
                    >
                        Description:
                    </label>
                    <Input
                        type={'text'}
                        name={'description'}
                        placeholder={'Description'}
                        value={formData.description}
                        handler={handleChange}
                        required
                    />
                    <label className="block mb-2 text-gray-700" htmlFor="price">
                        Price:
                    </label>
                    <Input
                        type={'number'}
                        name={'price'}
                        placeholder={'Price'}
                        value={formData.price}
                        handler={handleChange}
                        required
                    />
                    {!loading && <Button text="Submit" type="submit" />}
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
