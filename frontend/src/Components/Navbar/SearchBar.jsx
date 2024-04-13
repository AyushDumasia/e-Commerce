import React, {useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'

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

    function urlToSlug(url) {
        let slug = url.toLowerCase()
        slug = slug.replace(/[^\w\s-]/g, '')
        slug = slug.replace(/\s+/g, '-')
        slug = slug.replace(/^-+|-+$/g, '')
        return slug
    }

    const filter = async (e) => {
        const searchTerm = e.target.value
        setSearch(searchTerm)
    }

    return (
        <>
            <button
                className="flex items-center justify-center text-gray-600  focus:outline-none rounded-l-[8px]  p-[7px] bg-white border border-gray-600 border-r-0 h-[2.2rem]"
                onClick={handleSubmit}
            >
                <FiSearch />{' '}
            </button>
            <input
                value={search}
                onChange={filter}
                onKeyPress={handleSubmit}
                type="text"
                placeholder="Search..."
                className="border border-gray-600 h-[2.2rem] rounded-r-[8px] focus:outline-none p-[7px] border-l-0 pl-0 w-full"
            />
        </>
    )
}

export default SearchBar
