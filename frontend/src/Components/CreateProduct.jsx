import React, {useState} from 'react'
import axios from 'axios'
function CreateProduct() {
    // let [selectedFiles, setSelectedFiles] = useState([])
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        description: '',
        price: '',
    })

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
            )
            console.log(response)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div>
            <h1>Add Product</h1>
            <form action="" onClick={handleSubmit}>
                <label htmlFor="" className="">
                    Product Name :
                </label>
                <input
                    type="text"
                    name="productName"
                    placeholder=""
                    value={formData.productName}
                    onChange={handleChange}
                    required
                />
                {/* <label htmlFor="image">Images</label> */}
                {/* <form action="" onClick={handleFiles}>
                    <input
                        type="file"
                        multiple
                        id="image"
                        name="image"
                        accept="image/*"
                    />
                    <button type="submit">Upload</button>
                </form> */}
                <label htmlFor="" className="">
                    Category
                </label>
                <input
                    type="text"
                    name="category"
                    placeholder=""
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="" className="">
                    Description
                </label>
                <input
                    type="text"
                    name="description"
                    placeholder=""
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="" className="">
                    price
                </label>
                <input
                    type="number"
                    name="price"
                    placeholder=""
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <button>Create</button>
            </form>
        </div>
    )
}

export default CreateProduct
