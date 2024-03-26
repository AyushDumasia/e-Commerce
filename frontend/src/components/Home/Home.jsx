import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useAuth0} from '@auth0/auth0-react'

function Home() {
    const [userData, setUserData] = useState({})
    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/success', {
                withCredentials: true,
            })

            console.log(response)
            setUserData(response.data.user)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    let logIn = () => {
        window.open('http://localhost:5000/auth/google/callback', '_self')
    }
    return (
        <div className="bg-slate-700 text-center">
            <h1>Home page</h1>
            <p>{JSON.stringify(userData.username)}</p>
            <Link to="/signup">Sign Up</Link>
            <button onClick={logIn}>Log In</button>
        </div>
    )
}

export default Home
