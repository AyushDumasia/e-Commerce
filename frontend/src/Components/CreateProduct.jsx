import React, {useState} from 'react'
import Input from './Input/Input'
import Button from './Button/Button'
import axios from 'axios'

function CreateProduct() {
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        description: '',
        price: '',
    })

    const [selectedFiles, setSelectedFiles] = useState([])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formDataWithFiles = new FormData()

            // Append form data fields to FormData object
            Object.entries(formData).forEach(([key, value]) => {
                formDataWithFiles.append(key, value)
            })

            // Append selected files to FormData object
            selectedFiles.forEach((file) => {
                formDataWithFiles.append('images', file)
            })

            const response = await axios.post(
                'http://localhost:3000/api/product/createProduct',
                formDataWithFiles,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                },
            )

            console.log(response)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="mt-[100px] flex justify-center items-center">
            <div className="flex flex-col justify-center items-start w-[450px] bg-white p-8 rounded-lg">
                <form onSubmit={handleSubmit} encType="multiple/form-data">
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
                    <label htmlFor="images">Other Image:</label>
                    <Input
                        type={'file'}
                        multiple
                        id={'imageUrls'}
                        name={'imageUrls'}
                        accept="image/*"
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

                    <Button text="Submit" type="submit" />
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
