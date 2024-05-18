import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {setSearchCard} from '../../redux/search/searchSlice'
import FilterCard from './../Cards/FilterCard'
import ChildCard from './../Cards/ChildCards/ChildSearchCard'
import VerticalBar from './../Cards/VerticalBar'
import LoadingComponent from '../Cards/LoadingComponent'

export default function FilterPage() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const {searchTerm, option} = useParams()
    const {searchCard} = useSelector((state) => state.search)
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/product/search/${searchTerm}/${option}`,
            )
            dispatch(setSearchCard(response.data.data))
        } catch (err) {
            console.error(err)
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
    }, [searchTerm, option])

    return (
        <div className="overflow-hidden p-7 pl-3 flex">
            <VerticalBar />
            {loading ? (
                <div className="flex  w-[100%] justify-center">
                    <LoadingComponent />
                </div>
            ) : (
                <>
                    <div className="container p-3 mx-auto ">
                        <h1 className="text-xl font-semibold mb-8">
                            Search Results for "{searchTerm}"
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {searchCard !== null &&
                                searchCard.map((item) => (
                                    <ChildCard
                                        key={item._id}
                                        item={item}
                                        showProduct={showProduct}
                                    />
                                ))}
                        </div>
                    </div>

                    <FilterCard />
                </>
            )}
        </div>
    )
}
