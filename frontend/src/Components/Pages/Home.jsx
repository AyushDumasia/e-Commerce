import Footer from './../Cards/Home/Footer'
import Hero from '../Cards/Home/Hero'
import axios from 'axios'
import CategoryCard from '../Cards/Home/CategroryCard'
import {useState} from 'react'
import SpecialCard from './../Cards/Home/SpecialCard'
import {ToastContainer} from 'react-toastify'
import CustomToastContainer from './../Toast/CustomToastContainer'

function Home() {
    const categories = [
        {
            name: 'Electronics',
            image: 'https://res.cloudinary.com/dxrzskzvj/image/upload/v1716201480/bwawpfasq7hvhabsizaf.jpg',
        },
        {
            name: 'Clothing',
            image: 'https://res.cloudinary.com/dxrzskzvj/image/upload/v1716201466/qfnj6wp0kok5gflk9pxu.jpg',
        },
        {
            name: 'Books',
            image: 'https://res.cloudinary.com/dxrzskzvj/image/upload/v1716201452/dl13d82vvwfk0hot5jig.jpg',
        },
        {
            name: 'Toys',
            image: 'https://res.cloudinary.com/dxrzskzvj/image/upload/v1716201448/lpg3ntnjtbjebuxso8zn.jpg',
        },
    ]

    return (
        <div className="bg-slate-200">
            <CustomToastContainer />
            <Hero />
            <div className="p-6">
                <h1 className="text-3xl font-bold mt-4 text-center mb-6">
                    Explore Categories
                </h1>
                <div className="flex flex-wrap justify-center gap-6">
                    {categories.map((category, index) => (
                        <CategoryCard key={index} category={category} />
                    ))}
                </div>
            </div>

            <h1 className="text-3xl font-bold text-center my-6 sm:hidden lg:block">
                Trending Products
            </h1>
            <SpecialCard />
            <Footer />
        </div>
    )
}

export default Home
