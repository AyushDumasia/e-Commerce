import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import Button from './Button/Button.jsx'
import Password from './Password/Password.jsx'
import Input from './Input/Input'

import axios from 'axios'

function LogIn() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
                'http://localhost:3000/api/auth/login',
                formData,
                {withCredentials: true},
            )
            console.log('response : ', response)
            if (response.status === 200) {
                localStorage.setItem('userCookie', response.data.accessToken)
            }
            navigate('/cart')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="mt-[100px] flex justify-center items-center">
            <div className="flex flex-col justify-center items-start w-[450px] bg-white p-8 rounded-lg">
                <h1 className="font-bold text-3xl mb-3">Sign In</h1>
                <form onSubmit={handleSubmit} className="w-full">
                    <Input
                        label={'Email'}
                        type={'email'}
                        placeholder={'abc@xyz.com'}
                        value={formData.email}
                        name={'email'}
                        handler={handleChange}
                    />
                    <Password
                        label={'Password'}
                        placeholder={'Password'}
                        name={'password'}
                        value={formData.password}
                        handler={handleChange}
                    />
                    <Button text={'Submit'} />
                </form>
            </div>
        </div>
    )
}

export default LogIn
