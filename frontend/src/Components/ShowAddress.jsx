import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ShowAddress() {
    const [addressData, setAddressData] = useState(null)

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/address/fetchAddress',
                    {
                        withCredentials: true,
                    },
                )
                console.log(response.data)
                setAddressData(response.data) // Assuming the address data is in response.data
            } catch (err) {
                console.log(err)
            }
        }

        fetchAddress()
    }, [])

    return (
        <div>
            {addressData && Array.isArray(addressData) ? (
                addressData.map((address) => (
                    <div key={address._id}>
                        <p>State : {address.state}</p>
                    </div>
                ))
            ) : (
                <p>No address data available</p>
            )}
        </div>
    )
}

export default ShowAddress
