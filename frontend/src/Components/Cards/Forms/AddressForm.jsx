import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import CustomToastContainer from '../../Toast/CustomToastContainer'

function AddressForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        address1: '',
        address2: '',
        pinCode: '',
        city: '',
        state: '',
        country: '',
    })

    const [errors, setErrors] = useState({})

    const handleData = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const validateForm = () => {
        const errors = {}
        if (!formData.address1) {
            errors.address1 = 'Address Line 1 is required'
        }
        if (!formData.pinCode) {
            errors.pinCode = 'Pin Code is required'
        } else if (isNaN(formData.pinCode)) {
            errors.pinCode = 'Pin Code must be a number'
        }
        if (!formData.city) {
            errors.city = 'City is required'
        }
        if (!formData.state) {
            errors.state = 'State is required'
        }
        if (!formData.country) {
            errors.country = 'Country is required'
        }
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) {
            toast.error('Please fill in all required fields')
            return
        }

        try {
            const response = await axios.post(
                '/api/address/createAddress',
                formData,
                {withCredentials: true},
            )
            const orders = localStorage.getItem('orders')
            await axios.post(
                '/api/order/createOrder',
                {address: response.data.data, orders: orders},
                {withCredentials: true},
            )
            const payment = await axios.get('/api/payment/checkOut', {
                withCredentials: true,
            })
            const link = payment.data.session.url
            toast.success('Order submitted successfully')
            window.location.href = link
        } catch (err) {
            toast.error('Error submitting order')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <CustomToastContainer />
            <div className="flex w-[90%] justify-between items-center rounded-lg overflow-hidden ">
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="https://res.cloudinary.com/dxrzskzvj/image/upload/v1716357918/coewsg6bwrje701xbp5o.svg"
                        alt="Illustration"
                        className="object-cover"
                    />
                </div>
                <div className="w-full ml-[100px] md:w-1/2 p-8">
                    <h1 className="text-3xl font-bold mb-6">Add Address</h1>
                    <form onSubmit={handleSubmit} className="w-[70%]">
                        <Input
                            label="Address Line 1"
                            type="text"
                            placeholder="Address Line 1"
                            name="address1"
                            value={formData.address1}
                            handler={handleData}
                            error={errors.address1}
                            className="mb-4"
                        />
                        <Input
                            label="Address Line 2"
                            type="text"
                            placeholder="Address Line 2"
                            name="address2"
                            value={formData.address2}
                            handler={handleData}
                        />
                        <Input
                            label="Pin Code"
                            type="number"
                            placeholder="Pin Code"
                            name="pinCode"
                            value={formData.pinCode}
                            handler={handleData}
                            error={errors.pinCode}
                        />
                        <Input
                            label="City"
                            type="text"
                            placeholder="City"
                            name="city"
                            value={formData.city}
                            handler={handleData}
                            error={errors.city}
                        />
                        <Input
                            label="State"
                            type="text"
                            placeholder="State"
                            name="state"
                            value={formData.state}
                            handler={handleData}
                            error={errors.state}
                        />
                        <Input
                            label="Country"
                            type="text"
                            placeholder="Country"
                            name="country"
                            value={formData.country}
                            handler={handleData}
                            error={errors.country}
                        />
                        <Button text="Submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddressForm
