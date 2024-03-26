import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function SignUpForm() {
    const navigate = useNavigate()
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:5000/api/user/signup',
                {
                    username,
                    email,
                    phone,
                    password,
                },
            )
            console.log('User registered successfully:', response.data)
        } catch (error) {
            console.error('Error registering user:', error.response.data)
        }
        navigate('/')
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <span>
                Already Account
                <Link to="/log-in">Log in here</Link>
            </span>
            <form action="" onClick={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    value={username}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    value={email}
                />

                <label htmlFor="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) => {
                        setPhone(e.target.value)
                    }}
                    value={phone}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                />

                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm
