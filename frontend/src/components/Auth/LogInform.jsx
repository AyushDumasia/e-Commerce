import React, {useState} from 'react'
import axios from 'axios'

function LogInform() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:5000/api/user/login',
                {
                    email: formData.email,
                    password: formData.password,
                },
            )
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email ID"
                    onChange={handleInput}
                    value={formData.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleInput}
                    value={formData.password}
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LogInform
