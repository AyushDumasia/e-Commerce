import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Rating from 'react-rating-stars-component'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {setSearchCard} from '../../redux/search/searchSlice'

function SearchCard() {
    const dispatch = useDispatch()
    const {searchCard} = useSelector((state) => state.search)
    const searchTerm = useParams()
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/product/search/${searchTerm.searchTerm}`,
                {withCredentials: true},
            )
            dispatch(setSearchCard(response.data.data))
        } catch (err) {
            console.error(err)
        }
    }

    const showProduct = async (id) => {
        await axios.get(`http://localhost:3000/api/product/showProduct/${id}`)
        navigate(`/showProduct/${id}`)
    }

    useEffect(() => {
        fetchData()
    }, [searchTerm])

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-xl font-semibold mb-8">
                Search Results for "{searchTerm.searchTerm}"
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchCard &&
                    searchCard.map((item) => (
                        <div
                            onClick={() => showProduct(item._id)}
                            key={item._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <img
                                src={item.coverImage}
                                alt={item.productName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">
                                    {item.productName}
                                </h2>
                                <p className="text-gray-700">₹{item.price}</p>
                                <Rating
                                    value={item.rating}
                                    count={5}
                                    size={20}
                                    activeColor="orange"
                                    edit={false}
                                    isHalf={true}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default SearchCard
