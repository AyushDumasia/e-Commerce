// AuthProvider.js
import React, {createContext, useContext, useState} from 'react'

// Create AuthContext
const AuthContext = createContext()

// AuthProvider component
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    // Other authentication-related functions (login, logout, etc.) can be defined here

    // Export useAuth hook
    const useAuth = () => useContext(AuthContext)

    return (
        <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
    )
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext)
