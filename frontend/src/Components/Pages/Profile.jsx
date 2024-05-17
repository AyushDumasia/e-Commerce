import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {setProfile} from '../../redux/profile/profile'
import {useDispatch, useSelector} from 'react-redux'
import Avatar from 'react-avatar'
import LoadingComponent from '../Cards/LoadingComponent'
function Profile() {
    const dispatch = useDispatch()
    const {profile, apiError} = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        axios
            .get('/api/auth/passInfo', {
                withCredentials: true,
            })
            .then((response) => {
                dispatch(setProfile(response.data))
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="flex justify-center items-start h-screen bg-gray-200">
            {loading ? (
                <LoadingComponent />
            ) : (
                <div className="flex justify-between w-[90%] bg-white mt-6 shadow-md rounded-lg p-6">
                    <div className="flex-shrink-0 mr-6">
                        <Avatar
                            name={profile?.user.username}
                            size={200}
                            round={true}
                            skypeId={profile?.user.username}
                        />
                    </div>
                    <div className="flex-grow  mt-5">
                        <h2 className="text-4xl font-semibold mb-4">
                            {profile?.user?.username}
                        </h2>
                        <p className="text-lg text-gray-800 mb-2">
                            {profile?.user?.email}
                        </p>
                        <p className="text-lg text-gray-800 mb-2">
                            {profile?.user?.phone}
                        </p>
                        <div>
                            {profile?.merchant ? (
                                <>
                                    <h3 className="text-lg flex font-semibold mb-2">
                                        Merchant ID:&nbsp;&nbsp;
                                        <p className="text-gray-700 font-medium">
                                            {profile?.merchant?.licenseId}
                                        </p>
                                    </h3>
                                </>
                            ) : (
                                <p>You are not a merchant</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
