import React, {useState} from 'react'
import Input from './Input/Input'
import Button from './Button/Button'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {FaSpinner} from 'react-icons/fa' // Import loading spinner icon

function CreateProduct() {
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        description: '',
        price: '',
    })
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false) // State for loading animation

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        setSelectedFile(files[0]) // Assuming you only want to upload one file
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true) // Set loading to true when submitting

        try {
            const formDataWithFiles = new FormData()
            formDataWithFiles.append('coverImage', selectedFile) // Append the selected file
            formDataWithFiles.append('productName', formData.productName) // Append other form data
            formDataWithFiles.append('category', formData.category)
            formDataWithFiles.append('description', formData.description)
            formDataWithFiles.append('price', formData.price)

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
            })
        } catch (error) {
            console.error('Error:', error)
            toast.error('An error occurred. Please try again later.')
        } finally {
            setLoading(false) // Reset loading state when finished
        }
    }

    return (
        <div className="mt-[100px] flex justify-center items-center">
            <ToastContainer />
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

                    <label htmlFor="category">Category:</label>
                    <Input
                        type={'text'}
                        id={'category'}
                        name={'category'}
                        placeholder={'Category'}
                        value={formData.category}
                        handler={handleChange}
                        required
                    />

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

                    {loading ? (
                        <FaSpinner className="animate-spin text-blue-500" />
                    ) : (
                        <Button text="Submit" type="submit" />
                    )}
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
