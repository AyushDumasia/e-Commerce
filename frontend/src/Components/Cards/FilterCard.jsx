import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

function FilterCard() {
    const {searchTerm, option} = useParams()
    const [selectedFilter, setSelectedFilter] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setSelectedFilter(option || '')
    }, [searchTerm, option])

    const handleFilterChange = (option) => {
        let routeOption
        if (option === 'asc') {
            routeOption = 'asc'
        } else if (option === 'dsc') {
            routeOption = 'dsc'
        }
        navigate(`/explore/search/${searchTerm}/${routeOption}`)
        setSelectedFilter(option)
    }

    return (
        <div className=" rounded-lg sm:hidden xl:block">
            <label
                htmlFor="filterDropdown"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Filter:
            </label>
            <select
                id="filterDropdown"
                value={selectedFilter}
                onChange={(event) => handleFilterChange(event.target.value)}
                className="block w-24 text-base border-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                <option value="" disabled>
                    Select Filter
                </option>
                <option value="dsc">Low to High</option>
                <option value="asc">High to Low</option>
            </select>
        </div>
    )
}

export default FilterCard
