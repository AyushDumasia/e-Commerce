import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {FaSortAmountDown} from 'react-icons/fa'

function FilterCard() {
    const {searchTerm} = useParams()
    const [selectedFilter, setSelectedFilter] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        console.log(searchTerm)
    }, [searchTerm])

    const handleFilterChange = (option) => {
        setSelectedFilter(option)
        navigate(`/explore/search/${searchTerm}/${option}`)
    }

    return (
        <div className=" rounded-lg">
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
                <option value="asc">Low to High</option>
                <option value="dsc">High to Low</option>
            </select>
        </div>
    )
}

export default FilterCard
