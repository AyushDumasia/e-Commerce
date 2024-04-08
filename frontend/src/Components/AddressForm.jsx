import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from './Input/Input'
import Button from './Button/Button'
import CustomToastContainer from './Toast/CustomToastContainer'

function AddressForm() {
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
            toast.address1 = 'Address Line 1 is required'
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
        try {
            const response = await axios.post(
                'http://localhost:3000/api/address/createAddress',
                formData,
                {withCredentials: true},
            )
            if (response.status === 200) {
                toast.success('Address created successfully')
            }
        } catch (err) {
            toast.error('Please fill in all required fields')
        }
    }

    const Form = () => {
        return (
            <div className="flex flex-col justify-center items-start w-96 bg-white p-8 rounded-lg shadow-lg">
                <h1 className="font-bold text-3xl mb-6">Add Address</h1>
                <form onSubmit={handleSubmit} className="w-full">
                    <Input
                        label={'Address Line 1'}
                        type={'text'}
                        placeholder={'Address Line 1'}
                        name={'address1'}
                        value={formData.address1}
                        handler={handleData}
                        error={errors.address1}
                        className="mb-4"
                    />
                    <Input
                        label={'Address Line 2'}
                        type={'text'}
                        placeholder={'Address Line 2'}
                        name={'address2'}
                        value={formData.address2}
                        handler={handleData}
                        className="mb-4"
                    />
                    <Input
                        label={'Pin Code'}
                        type={'number'}
                        placeholder={'Pin Code'}
                        name={'pinCode'}
                        value={formData.pinCode}
                        handler={handleData}
                        error={errors.pinCode}
                        className="mb-4"
                    />
                    <Input
                        label={'City'}
                        type={'text'}
                        placeholder={'City'}
                        name={'city'}
                        value={formData.city}
                        handler={handleData}
                        error={errors.city}
                        className="mb-4"
                    />
                    <Input
                        label={'State'}
                        type={'text'}
                        placeholder={'State'}
                        name={'state'}
                        value={formData.state}
                        handler={handleData}
                        error={errors.state}
                        className="mb-4"
                    />
                    <Input
                        label={'Country'}
                        type={'text'}
                        placeholder={'Country'}
                        name={'country'}
                        value={formData.country}
                        handler={handleData}
                        error={errors.country}
                        className="mb-4"
                    />
                    <Button
                        text={'Submit'}
                        onClick={validateForm}
                        className="w-full"
                    />
                </form>
            </div>
        )
    }

    return (
        <div className="mt-20 flex justify-center items-center">
            <CustomToastContainer />
            {Form()}
        </div>
    )
}

export default AddressForm
