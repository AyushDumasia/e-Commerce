import React, {useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'
import {RxCross2} from 'react-icons/rx'

function SearchBar() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            try {
                if (!search) {
                    return
                }
                navigate(`/explore/search/${search}`)
            } catch (err) {
                console.log(err)
            }
        }
    }

    const clearSearch = () => {
        setSearch('')
    }

    const filter = async (e) => {
        const searchTerm = e.target.value
        setSearch(searchTerm)
    }

    return (
        <div className="flex bg-[red] items-center border border-gray-300 rounded-md overflow-hidden">
            <button
                onClick={handleSubmit}
                className="flex items-center justify-center bg-white text-gray-600 focus:outline-none px-3 h-10"
                aria-label="Search"
            >
                <FiSearch />
            </button>

            <input
                value={search}
                onChange={filter}
                onKeyPress={handleSubmit}
                type="text"
                placeholder="Search..."
                className="border-none w-[700px] focus:outline-none flex-grow px-4 py-2"
            />
            {search ? (
                <button
                    onClick={clearSearch}
                    className="flex items-center justify-center bg-white text-gray-600 focus:outline-none px-3 h-10"
                    aria-label="Clear search"
                >
                    <RxCross2 />
                </button>
            ) : (
                ''
            )}
        </div>
    )
}

export default SearchBar
