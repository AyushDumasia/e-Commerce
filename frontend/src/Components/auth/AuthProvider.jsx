import React, {useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function AuthProvider() {
    const navigate = useNavigate()
    const {user, apiError} = useSelector((state) => state.user)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    return user ? <Outlet /> : null
}

export default AuthProvider
