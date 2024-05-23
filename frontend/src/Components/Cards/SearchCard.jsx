import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {setSearchCard} from '../../redux/search/searchSlice'
import ChildCard from './ChildCards/ChildSearchCard'
import CustomToastContainer from '../Toast/CustomToastContainer'
import {toast} from 'react-toastify'
import LoadingComponent from './LoadingComponent'

function SearchCard() {
    const dispatch = useDispatch()
    const {searchCard} = useSelector((state) => state.search)
    const [loading, setLoading] = useState(true)
    const {searchTerm} = useParams()
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/product/search/${searchTerm}`,
                {
                    withCredentials: true,
                },
            )
            console.log(response.data.data)
            dispatch(setSearchCard(response.data.data))
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const showProduct = async (id) => {
        await axios.get(`/api/product/showProduct/${id}`)
        navigate(`/showProduct/${id}`)
    }

    useEffect(() => {
        fetchData()
    }, [searchTerm])

    return (
        <div className="container mx-auto p-3 ">
            <CustomToastContainer />
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    <h1 className="text-xl font-semibold mb-8">
                        Search Results for '{searchTerm}'
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:flex sm:flex-wrap sm:justify-center xl:justify-start">
                        {searchCard.length === 0 ? (
                            <p>No results found for '{searchTerm}'</p>
                        ) : (
                            searchCard.map((item) => (
                                <ChildCard
                                    key={item._id}
                                    item={item}
                                    showProduct={showProduct}
                                />
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default SearchCard
