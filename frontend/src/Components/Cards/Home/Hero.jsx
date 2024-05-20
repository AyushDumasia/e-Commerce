import React from 'react'
import {Link} from 'react-router-dom'

function Hero() {
    return (
        <div className="relative h-screen px-[100px] bg-slate-200">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <svg
                    viewBox="50 30 100 50"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-blue-500 transform rotate-180"
                >
                    <circle cx="50" cy="50" r="50" />
                </svg>
            </div>
            <div className="relative flex items-center justify-evenly flex-col lg:flex-row w-full max-w-7xl mx-auto z-10 px-4 sm:px-6 lg:px-8">
                <div className="text-center lg:text-left text-gray-900 py-8 lg:py-0 lg:w-1/2">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font mb-4 leading-tight">
                        Online
                    </h1>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
                        SHOPPING
                    </h1>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-4 leading-tight">
                        Concept
                    </h1>
                    <p className="text-xl sm:text-2xl lg:text-2xl mb-8 leading-relaxed">
                        Discover the best products at unbeatable prices
                    </p>
                    <Link
                        to="/explore/1"
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-md transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Shop Now
                    </Link>
                </div>
                <div className="w-full lg:w-1/2 mt-4 lg:mt-0 flex justify-center lg:justify-end">
                    <img
                        src="https://res.cloudinary.com/dxrzskzvj/image/upload/v1716198612/aieyofowlrjupbtl0zo1.svg"
                        alt="Vector 2"
                        className="h-64 sm:h-80 lg:h-auto object-contain z-20"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero
