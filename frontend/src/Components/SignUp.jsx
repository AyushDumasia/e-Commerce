import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        gender: '',
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
                'http://localhost:3000/api/auth/signup',
                formData,
            )
            console.log(response.data)
            navigate('/home')
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block">
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Your Username"
                        onChange={handleChange}
                        name="username"
                        id="username"
                        value={formData.username}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={handleChange}
                        name="email"
                        id="email"
                        value={formData.email}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block">
                        Phone
                    </label>
                    <input
                        type="tel"
                        placeholder="Enter Your Phone"
                        onChange={handleChange}
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="gender" className="block">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="password" className="block">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        onChange={handleChange}
                        name="password"
                        id="password"
                        value={formData.password}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp
