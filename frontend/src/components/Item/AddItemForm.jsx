import React, {useState, useEffect} from 'react'
import axios from 'axios'

function AddItemForm() {
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        prize: '',
        description: '',
        gender: '',
        postedBy: '', // Include postedBy field for user ID
    })
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(
                    'http://localhost:5000/success',
                    {withCredentials: true},
                )
                setFormData((prevData) => ({
                    ...prevData,
                    postedBy: response.data.user._id, // Assuming user ID is available in response.data.user._id
                }))
            } catch (error) {
                console.error('Error fetching user:', error)
            }
        }

        fetchUser()
    }, [])

    const handleInput = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:5000/api/item/addItem',
                formData, // Send the entire formData object including postedBy field
            )
            console.log(response)
        } catch (err) {
            console.error('Error adding item:', err)
        }
    }

    return (
        <div>
            <h1>Add Item Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="productName">Product Name:</label>
                <input
                    type="text"
                    value={formData.productName}
                    name="productName"
                    placeholder="Enter product name"
                    onChange={handleInput}
                />
                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    value={formData.category}
                    name="category"
                    placeholder="Enter category"
                    onChange={handleInput}
                />
                <label htmlFor="prize">Price:</label>
                <input
                    type="text"
                    value={formData.prize}
                    name="prize"
                    placeholder="Enter price"
                    onChange={handleInput}
                />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    value={formData.description}
                    name="description"
                    placeholder="Enter description"
                    onChange={handleInput}
                />
                <label htmlFor="gender">Gender:</label>
                <input
                    type="text"
                    value={formData.gender}
                    name="gender"
                    placeholder="Enter gender"
                    onChange={handleInput}
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    )
}

export default AddItemForm
