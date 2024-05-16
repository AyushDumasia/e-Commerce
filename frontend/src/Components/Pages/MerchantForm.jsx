import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import ReactLoading from 'react-loading'
import 'react-toastify/dist/ReactToastify.css'
import CustomToastContainer from './../Toast/CustomToastContainer'
import {useDispatch, useSelector} from 'react-redux'
import {setErrMerchant, setMerchant} from '../../redux/merchant/merchantSlice'
import Input from './../Input/Input'

function MerchantForm() {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({shopName: ''})
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const {merchant, errMerchant} = useSelector((state) => state.merchant)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const becomeMerchant = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formDataWithFiles = new FormData()
            formDataWithFiles.append('document', selectedFile)
            await axios.post(
                '/api/merchant/becomeMerchant',
                formDataWithFiles,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            fetchMerchantData()
            setSelectedFile(null)
            toast.success('Merchant application submitted successfully!')
        } catch (error) {
            toast.error('An error occurred. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const fetchMerchantData = async () => {
        try {
            const response = await axios.get('/api/merchant/currentMerchant', {
                withCredentials: true,
            })
            dispatch(setMerchant(response?.data?.licenseId))
        } catch (err) {
            dispatch(setErrMerchant(err.message))
        }
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        setSelectedFile(files[0])
    }

    return (
        <div className="flex flex-col items-center min-h-screen h-screens bg-gray-100">
            <CustomToastContainer />

            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <ReactLoading
                        type={'cylon'}
                        color={'#123456'}
                        height={50}
                        width={50}
                    />
                </div>
            )}

            <div className="max-w-md flex flex-col  h-[500px] bg-white  rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Merchant Application
                </h1>

                <p className="text-red-600 mb-4 text-center">
                    Upon submission of your valid document, your merchant
                    application will be reviewed for approval.
                </p>

                <form
                    onSubmit={becomeMerchant}
                    className="flex flex-col items-center"
                >
                    <label htmlFor="document" className="mb-4 w-full">
                        <span className="text-lg font-semibold block my-5">
                            Upload Document:
                        </span>
                        <Input
                            label={'Shop Name : '}
                            type={'text'}
                            placeholder={'Enter a your shop name'}
                            value={formData.shopData}
                            name={'shopName'}
                            handler={handleChange}
                        />
                        <p className="m-4"></p>
                        <input
                            type="file"
                            name="document"
                            id="document"
                            onChange={handleFileChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 w-full"
                        />
                    </label>

                    <button
                        type="submit"
                        className={`bg-blue-500 mt-6 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MerchantForm
