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
            <option value="">Select Filter</option>
            <option value="asc">High to Low</option>
            <option value="dsc">Low to High</option>
        </select>
    )
}

function FilterCard() {
    const {searchTerm} = useParams()
    const [selectedFilter, setSelectedFilter] = useState('')
    const navigate = useNavigate()

    useEffect(() => {}, [searchTerm])

    const handleFilterChange = (option) => {
        setSelectedFilter(option)
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
            />
        </div>
    )
}

export default FilterCard
