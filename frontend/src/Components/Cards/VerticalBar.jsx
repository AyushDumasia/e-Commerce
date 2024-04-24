import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {BiSolidCategory} from 'react-icons/bi'

function VerticalBar() {
    const navigate = useNavigate()

    const categories = [
        'Groceries',
        'Beauty & Personal Care',
        'Electronics',
        'Home & Kitchen',
        'Health & Personal Care',
    ]

    const handleCategoryClick = (category) => {
        navigate(`/explore/search/${category}`)
    }

    return (
        <div className="static rounded-lg top-0 h-full p-3 mr-2 w-56 flex flex-col">
            <h2 className="text-lg font-semibold mt-4 mb-2 flex items-center">
                <BiSolidCategory />
                &nbsp; Categories
            </h2>
            <div className="flex flex-col">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="w-full px-2 py-4 text-gray-700  border-b  hover:bg-gray-300 hover:rounded-md cursor-pointer "
                        onClick={() => handleCategoryClick(category)}
                    >
                        <NavLink
                            to={`/explore/search/${category}`}
                            className={({isActive}) =>
                                `${isActive ? 'text-[blue] text-sm ' : 'text-black text-sm'}`
                            }
                        >
                            <div>{category}</div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VerticalBar
