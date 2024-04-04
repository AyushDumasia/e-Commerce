// PrivateRoute.js
import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from './auth/AuthProvider' // Import your authentication context

const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useAuth() // Get the user from the authentication context

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    )
}

export default PrivateRoute
