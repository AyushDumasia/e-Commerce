import React from 'react'
import {useNavigate} from 'react-router-dom'

const CategoryCard = ({category}) => {
    const navigate = useNavigate()

    const handleCategoryClick = () => {
        navigate(`/explore/search/${category.name}`)
    }

    return (
        <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">
            <div
                className="relative cursor-pointer"
                onClick={handleCategoryClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick()}
            >
                <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-[300px] sm:h-64"
                />
                <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-3xl font-semibold text-center px-4">
                        {category.name}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard
