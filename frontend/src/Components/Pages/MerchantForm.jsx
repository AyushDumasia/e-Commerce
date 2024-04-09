import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import ReactLoading from 'react-loading'
import 'react-toastify/dist/ReactToastify.css'
import CustomToastContainer from './../Toast/CustomToastContainer'

function MerchantForm() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const becomeMerchant = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formDataWithFiles = new FormData()
            formDataWithFiles.append('document', selectedFile)
            await axios.post(
                'http://localhost:3000/api/merchant/becomeMerchant',
                formDataWithFiles,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
        } catch (error) {
            toast.error('An error occurred. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        setSelectedFile(files[0])
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <CustomToastContainer />

            {loading && (
                <div className="flex mt-24 justify-center items-center">
                    <ReactLoading
                        type={'cylon'}
                        color={'#123456'}
                        height={50}
                        width={50}
                    />
                </div>
            )}

            <h1 className="text-3xl font-bold mb-8">Become a Merchant</h1>

            <form
                className="flex flex-col items-center"
                onSubmit={becomeMerchant}
            >
                <label htmlFor="document" className="mb-4">
                    <span className="text-lg font-semibold">
                        Upload Document:
                    </span>
                    <input
                        type="file"
                        name="document"
                        id="document"
                        onChange={handleFileChange}
                        className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </label>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default MerchantForm
