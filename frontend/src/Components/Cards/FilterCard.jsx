import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

function Filter(props) {
    return (
        <select
            id="filterDropdown"
            value={props.selectedFilter}
            onChange={(event) => props.handleFilterChange(event.target.value)}
            className="block w-24 text-base border-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
            <option value="" disabled>
                Select Filter
            </option>
            <option value="asc">Low to High</option>
            <option value="dsc">High to Low</option>
        </select>
    )
}

function FilterCard() {
    const {searchTerm} = useParams()
    const [selectedFilter, setSelectedFilter] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        console.log(searchTerm)
    }, [searchTerm])

    const handleFilterChange = (option) => {
        setSelectedFilter(option)
        console.log(`/explore/search/${searchTerm}/${option}`)
        navigate(`/explore/search/${searchTerm}/${option}`)
    }

    return (
        <div className="p-3 bg-white rounded-lg shadow-md">
            <label
                htmlFor="filterDropdown"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Filter:
            </label>
            <Filter
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
            ></Filter>
        </div>
    )
}

export default FilterCard
