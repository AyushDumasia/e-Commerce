import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
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
            // axios.defaults.headers.common['Authorization'] =
            // `Bearer ${response.data.accessToken}`
            navigate('/cart')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h1>Log In </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LogIn
