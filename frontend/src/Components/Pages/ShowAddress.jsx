import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {motion, AnimatePresence} from 'framer-motion'

function ShowAddress() {
    const [addressData, setAddressData] = useState(null)
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null)

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await axios.get('/api/address/fetchAddress', {
                    withCredentials: true,
                })
                console.log(response.data)
                setAddressData(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchAddress()
    }, [])

    const handleRadioChange = (index) => {
        setSelectedAddressIndex(index)
    }

    return (
        <div className="container mx-auto py-6">
            <AnimatePresence>
                {addressData &&
                    Array.isArray(addressData) &&
                    addressData.map((address, index) => (
                        <motion.div
                            key={address._id}
                            className="flex items-center mb-4"
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.5, delay: index * 0.1}}
                        >
                            <input
                                type="radio"
                                name="address"
                                value={index}
                                checked={selectedAddressIndex === index}
                                onChange={() => handleRadioChange(index)}
                                className="mr-2"
                            />
                            <div className="border rounded p-4">
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
                                    <span className="font-semibold">City:</span>{' '}
                                    {address.city}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">
                                        State:
                                    </span>{' '}
                                    {address.state}
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
            </AnimatePresence>
            {(!addressData || !addressData.length) && (
                <p className="text-center">No address data available</p>
            )}
        </div>
    )
}

export default ShowAddress
