import React from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
const Home = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-r h-[500px] from-blue-500 to-indigo-600 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Welcome to Our Store
                    </h1>
                    <p className="text-lg">
                        Shop the latest trends in fashion!
                    </p>
                    {/* Add call-to-action buttons or other elements */}
                    <button className="bg-white text-indigo-600 px-6 py-3 mt-8 font-semibold rounded hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">
                        Shop Now
                    </button>
                </div>
            </section>
            {/* Image Slider */}
            <div className="container mx-auto my-8">
                <Slider {...settings}>
                    <div>
                        <img
                            src="https://via.placeholder.com/600x400"
                            alt="slide1"
                        />
                    </div>
                    <div>
                        <img
                            src="https://via.placeholder.com/600x400"
                            alt="slide2"
                        />
                    </div>
                    <div>
                        <img
                            src="https://via.placeholder.com/600x400"
                            alt="slide3"
                        />
                    </div>
                </Slider>
            </div>{' '}
            <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1 */}
                <div className="relative">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        <img
                            loading="lazy"
                            src="https://res.cloudinary.com/dxrzskzvj/image/upload/v1712328963/mknenzfsubkkz67rdryo.jpg"
                            alt="Product"
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-center py-2 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                            <button className="text-white font-semibold">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="relative">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        <img
                            loading="lazy"
                            src="https://res.cloudinary.com/dxrzskzvj/image/upload/v1712329227/o2yohat13tbznizecbuk.jpg"
                            alt="Product"
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-center py-2 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                            <button className="text-white font-semibold">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="relative">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        <img
                            loading="lazy"
                            src="https://res.cloudinary.com/dxrzskzvj/image/upload/v1712329328/khxkwyz8k5iy6vmgzizx.jpg"
                            alt="Product"
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-center py-2 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                            <button className="text-white font-semibold">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                {/* Card 4 */}
                <div className="relative">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        <img
                            loading="lazy"
                            src="https://res.cloudinary.com/dxrzskzvj/image/upload/v1712329380/blyej3whfbsmw4acwtpj.jpg"
                            alt="Product"
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-center py-2 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                            <button className="text-white font-semibold">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
