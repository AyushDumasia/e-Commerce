import React, {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {FaSpinner} from 'react-icons/fa'
import ReactLoading from 'react-loading' // Import ReactLoading
import Input from './../../Input/Input'
import Button from './../../Button/Button'
import CustomToastContainer from './../../Toast/CustomToastContainer'

function CreateProduct() {
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        description: '',
        price: '',
        stock: '',
    })
    const [selectedFile, setSelectedFile] = useState(null)
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
        setSelectedFile(files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formDataWithFiles = new FormData()
            formDataWithFiles.append('coverImage', selectedFile)
            formDataWithFiles.append('productName', formData.productName)
            formDataWithFiles.append('category', formData.category)
            formDataWithFiles.append('description', formData.description)
            formDataWithFiles.append('price', formData.price)
            formDataWithFiles.append('stock', formData.stock)

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
        } catch (error) {
            console.error('Error:', error)
            toast.error('An error occurred. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-[100px] flex justify-center items-center">
            <CustomToastContainer />
            {loading && (
                <div className="flex justify-center items-center absolute inset-0 bg-gray-900 bg-opacity-50 z-50">
                    <ReactLoading
                        type={'spin'}
                        color={'#123456'}
                        height={50}
                        width={50}
                    />
                </div>
            )}
            <div className="flex flex-col justify-center items-start w-[450px] bg-white p-8 rounded-lg">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label htmlFor="productName">Product Name:</label>
                    <Input
                        type={'text'}
                        name={'productName'}
                        placeholder={'Product Name'}
                        value={formData.productName}
                        handler={handleChange}
                        required
                    />
                    <label htmlFor="images">Cover Image:</label>
                    <Input
                        type={'file'}
                        id={'coverImage'}
                        name={'coverImage'}
                        accept={'image/*'}
                        handler={handleFileChange}
                    />
                    <label htmlFor="productName">Stock :</label>
                    <Input
                        type={'text'}
                        name={'stock'}
                        placeholder={'Stock'}
                        value={formData.stock}
                        handler={handleChange}
                        required
                    />
                    <div className="mb-[5px] w-full">
                        <label htmlFor="Gender" className="text-lg">
                            Category
                        </label>
                        <select
                            id="category"
                            value={formData.category}
                            name={'category'}
                            onChange={handleChange}
                            className="border p-2 cursor-pointer rounded mt-[3px] w-full text-base focus:outline-none no-arrow text-placeholder"
                        >
                            <option value="" disabled hidden>
                                Select Category
                            </option>
                            <option value="Electronics" className="text-black">
                                Electronics
                            </option>
                            <option
                                value="Home & Kitchen"
                                className="text-black"
                            >
                                Home & Kitchen
                            </option>
                            <option value="Books" className="text-black">
                                Books
                            </option>
                            <option
                                value="Health & Personal Care"
                                className="text-black"
                            >
                                Health & Personal Care
                            </option>
                            <option
                                value="Beauty & Personal Care"
                                className="text-black"
                            >
                                Beauty & Personal Care
                            </option>
                            <option value="Toys & Games" className="text-black">
                                Toys & Games
                            </option>
                            <option
                                value="Sports & Outdoors"
                                className="text-black"
                            >
                                Sports & Outdoors
                            </option>
                            <option value="Food" className="text-black">
                                Food
                            </option>
                            <option
                                value="pickles and Papad"
                                className="text-black"
                            >
                                pickles and Papad
                            </option>
                            <option
                                value="Clothing & Accessories"
                                className="text-black"
                            >
                                Clothing & Accessories
                            </option>
                        </select>
                    </div>
                    <label htmlFor="description">Description:</label>
                    <Input
                        type={'text'}
                        name={'description'}
                        placeholder={'Description'}
                        value={formData.description}
                        handler={handleChange}
                        required
                    />
                    <label htmlFor="price">Price:</label>
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
