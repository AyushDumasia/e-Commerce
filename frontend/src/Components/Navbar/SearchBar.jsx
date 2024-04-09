import React, {useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'

function SearchBar() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault() // Prevent default form submission behavior
            try {
                navigate(`/explore/search/${search}`)
            } catch (err) {
                console.log(err)
            }
        }
    }

    const filter = async (e) => {
        const searchTerm = e.target.value
        setSearch(searchTerm)
    }

    return (
        <>
            <button
                className="flex items-center justify-center text-gray-600  focus:outline-none rounded-l-3xl h-[40px] p-[7px] bg-white border border-black border-r-0"
                onClick={handleSubmit} // Call handleSubmit function on button click
            >
                <FiSearch />{' '}
            </button>
            <input
                value={search}
                onChange={filter}
                onKeyPress={handleSubmit} // Call handleSubmit function on key press
                type="text"
                placeholder="Search..."
                className="border border-black rounded-r-3xl focus:outline-none h-[40px] p-[7px] border-l-0 pl-0 w-full"
            />
        </>
    )
}

export default SearchBar
