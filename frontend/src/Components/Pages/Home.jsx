import React from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Home = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
    }

    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <section className="h-[500px] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="https://via.placeholder.com/800x500"
                        alt="Hero"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Discover Your Style
                    </h1>
                    <p className="text-lg text-white mb-8">
                        Find the perfect outfit for any occasion
                    </p>
                    <Link
                        to="/shop"
                        className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="container mx-auto my-12">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Featured Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow-md"
                        >
                            <img
                                src={`https://via.placeholder.com/400x300?text=Feature${index + 1}`}
                                alt={`Feature ${index + 1}`}
                                className="w-full h-auto"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">
                                    Product Name {index + 1}
                                </h3>
                                <p className="text-gray-600">
                                    Product Description
                                </p>
                                <Link
                                    to={`/product/${index + 1}`}
                                    className="block mt-4 text-indigo-600 hover:underline"
                                >
                                    View Product
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Image Slider */}
            <section className="container mx-auto my-12">
                <Slider {...sliderSettings}>
                    {[...Array(3)].map((_, index) => (
                        <div key={index}>
                            <img
                                src={`https://via.placeholder.com/800x400?text=Slide${index + 1}`}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-auto"
                            />
                        </div>
                    ))}
                </Slider>
            </section>
        </div>
    )
}

export default Home
