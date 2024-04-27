import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {BiSolidCategory} from 'react-icons/bi'
import {AnimatePresence, motion} from 'framer-motion'

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
        <div className="static rounded-lg top-0 h-full p-3 mr-2 w-60 flex flex-col">
            <h2 className="text-lg font-semibold mt-4 mb-2 flex items-center">
                <BiSolidCategory />
                &nbsp; Categories
            </h2>
            <AnimatePresence>
                <div className="flex flex-col">
                    {categories?.map((category, index) => (
                        <motion.div
                            key={index}
                            className="w-full px-2 py-4 text-gray-700  border-b border-gray-900  hover:bg-gray-300  cursor-pointer "
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.5, delay: index * 0.1}}
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
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>
        </div>
    )
}

export default VerticalBar
