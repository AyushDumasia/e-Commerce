import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {motion, AnimatePresence} from 'framer-motion'
import LoadingComponent from '../Cards/LoadingComponent'
import {toast} from 'react-toastify'
import CustomToastContainer from './../Toast/CustomToastContainer'
import {useNavigate} from 'react-router'

function ShowAddress() {
    const navigate = useNavigate()
    const [addressData, setAddressData] = useState(null)
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await axios.get('/api/address/fetchAddress', {
                    withCredentials: true,
                })
                setAddressData(response.data.data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchAddress()
    }, [])

    const handleRadioChange = (index) => {
        setSelectedAddressIndex(index)
    }

    const sendData = async () => {
        console.log(selectedAddressIndex)
        if (selectedAddressIndex === null) {
            toast.error('Please select an address')
            return
        }
        const selectedAddress = addressData[selectedAddressIndex]
        try {
            const orders = localStorage.getItem('orders')
            const response = await axios.post(
                '/api/order/createOrder',
                {address: selectedAddress, orders: orders},
                {
                    withCredentials: true,
                },
            )
            toast.success('Address submitted successfully')
            navigate('/order')
        } catch (err) {
            console.log(err)
            toast.error('Error submitting address')
        }
    }

    return (
        <div className="container mx-auto py-6">
            <CustomToastContainer />
            {loading ? (
                <div className="mt-[100px]">
                    <LoadingComponent />
                </div>
            ) : (
                <AnimatePresence>
                    {addressData &&
                    Array.isArray(addressData) &&
                    addressData.length > 0 ? (
                        <>
                            {addressData.map((address, index) => (
                                <motion.div
                                    key={address._id}
                                    className="flex items-center mb-4"
                                    initial={{opacity: 0, y: 50}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -50}}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="address"
                                        value={index}
                                        checked={selectedAddressIndex === index}
                                        onChange={() =>
                                            handleRadioChange(index)
                                        }
                                        className="mr-2"
                                    />
                                    <div className="rounded p-4">
                                        <p className="mb-2">
                                            <span className="font-semibold">
                                                State:
                                            </span>{' '}
                                            {address.state}
                                        </p>
                                        <p className="mb-2">
                                            <span className="font-semibold">
                                                Address 1:
                                            </span>{' '}
                                            {address.address1}
                                        </p>
                                        <p className="mb-2">
                                            <span className="font-semibold">
                                                Address 2:
                                            </span>{' '}
                                            {address.address2}
                                        </p>
                                        <p className="mb-2">
                                            <span className="font-semibold">
                                                Pin Code:
                                            </span>{' '}
                                            {address.pinCode}
                                        </p>
                                        <p className="mb-2">
                                            <span className="font-semibold">
                                                City:
                                            </span>{' '}
                                            {address.city}
                                        </p>
                                        <p className="mb-2">
                                            <span className="font-semibold">
                                                Country:
                                            </span>{' '}
                                            {address.country}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={sendData}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Submit Address
                                </button>
                                <button
                                    onClick={() => navigate('/createAddress')}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-4"
                                >
                                    Add New Address
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center">No address data available</p>
                    )}
                </AnimatePresence>
            )}
        </div>
    )
}

export default ShowAddress
