import React, {useState} from 'react'
import Input from './Input/Input'
import Button from './Button/Button'
import axios from 'axios'
function CreateProduct() {
    let [selectedFiles, setSelectedFiles] = useState([])
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        description: '',
        price: '',
    })
    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files))
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:3000/api/product/createProduct',
                formData,
                {withCredentials: true},
            )
            console.log(response)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="mt-[100px] flex justify-center items-center">
            <div className="flex flex-col justify-center items-start w-[450px] bg-white p-8 rounded-lg">
                <form action="" onClick={handleSubmit}>
                    <label htmlFor="" className="">
                        Product Name :
                    </label>
                    <Input
                        type={'text'}
                        name={'productName'}
                        placeholder={'Product Name'}
                        value={formData.productName}
                        handler={handleChange}
                        required
                    />
                    <label htmlFor="image">Images</label>
                    <Input
                        type="file"
                        multiple
                        id="image"
                        name="image"
                        accept="image/*"
                        handler={handleFileChange}
                    />
                    {/* <button type="submit">Upload</button> */}
                    <label htmlFor="category" className="">
                        Category
                    </label>
                    <Input
                        type={'text'}
                        id={'category'}
                        name={'category'}
                        placeholder={'Category'}
                        value={formData.category}
                        handler={handleChange}
                        required
                    />
                    <label htmlFor="" className="">
                        Description
                    </label>
                    <Input
                        type={'text'}
                        name={'description'}
                        placeholder={'Description'}
                        value={formData.description}
                        handler={handleChange}
                        required
                    />
                    <label htmlFor="" className="">
                        price
                    </label>
                    <Input
                        type={'number'}
                        name={'price'}
                        placeholder={'Price'}
                        value={formData.price}
                        handler={handleChange}
                        required
                    />
                    <Button text={'Submit'} />
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
