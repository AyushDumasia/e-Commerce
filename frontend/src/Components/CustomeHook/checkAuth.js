import axios from 'axios'

export const checkAuthentication = async () => {
    try {
        const response = await axios.get(
            'http://localhost:3000/api/auth/currentUser',
            {withCredentials: true},
        )
        setUser(response.data)
    } catch (error) {
        setUser(null)
    }
}
