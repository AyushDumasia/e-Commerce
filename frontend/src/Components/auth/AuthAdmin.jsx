import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Outlet, useNavigate} from 'react-router-dom'

function AuthAdmin() {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.user)

    useEffect(() => {
        if (!user || user.username !== 'admin') {
            navigate('/')
        }
    }, [user, navigate])

    return user && user.username === 'admin' ? <Outlet /> : null
}

export default AuthAdmin
