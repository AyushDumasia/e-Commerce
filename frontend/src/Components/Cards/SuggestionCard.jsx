import React, {useEffect} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {setSuggestedCard} from '../../redux/suggestedProducts/suggestedProductSlice'
import {useNavigate} from 'react-router-dom'
import ChildCard from './ChildCards/ChildSearchCard'

function SuggestionCard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    const {suggestedCard, apiError} = useSelector(
        (state) => state.suggestedProduct,
    )

    useEffect(() => {
        fetchData()
    }, [id])

    const fetchData = async () => {
        axios
            .get(`http://localhost:3000/api/product/category/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                dispatch(setSuggestedCard(response.data.data))
            })
            .catch((error) => {
                // dispatch(setApiError(error));
            })
    }

    const showProduct = async (id) => {
        await axios.get(`http://localhost:3000/api/product/showProduct/${id}`)
        navigate(`/showProduct/${id}`)
    }

    return (
        <div className="grid mt-10 border border-gray-400 p-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestedCard ? (
                suggestedCard?.map((item) => (
                    <ChildCard
                        key={item._id}
                        item={item}
                        showProduct={showProduct}
                    />
                ))
            ) : (
                <p>No Products for this category</p>
            )}
        </div>
    )
}
export default SuggestionCard
