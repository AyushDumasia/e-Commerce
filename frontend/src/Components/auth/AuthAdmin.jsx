import React, {useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function AuthAdmin() {
    const navigate = useNavigate()
    const {user, apiError} = useSelector((state) => state.user)

    useEffect(() => {
        if (!user || user?.username != 'admin') {
            navigate('/')
        }
    }, [user, navigate])

    return user ? <Outlet /> : null
}

export default AuthAdmin
