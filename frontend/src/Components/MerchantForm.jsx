import React, {useState} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MerchantForm() {
    const [selectedFile, setSelectedFile] = useState(null)

    const becomeMerchant = async (e) => {
        e.preventDefault()
        try {
            const formDataWithFiles = new FormData()
            formDataWithFiles.append('document', selectedFile) // Append the selected file
            const response = await axios.post(
                'http://localhost:3000/api/merchant/becomeMerchant',
                formDataWithFiles,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            // console.log(response)
        } catch (error) {
            // console.error('Error:', error)
            toast.error('An error occurred. Please try again later.')
        }
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        setSelectedFile(files[0])
    }

    return (
        <div>
            <h1>Become a Merchant</h1>
            <form onSubmit={becomeMerchant}>
                {' '}
                {/* Use onSubmit event handler */}
                <input
                    type="file"
                    name="document"
                    id="document"
                    onChange={handleFileChange}
                />
                <button type="submit">Submit</button>
            </form>
            <ToastContainer />{' '}
        </div>
    )
}

export default MerchantForm
