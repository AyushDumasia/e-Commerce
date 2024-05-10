import React, {useState, useEffect} from 'react'
import Slider from './Slider'

function Carousel({images}) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 5000)

        return () => clearInterval(intervalId)
    }, [images])

    return (
        <div className="relative overflow-hidden mb-8">
            <div
                className="flex transition-transform duration-1000 ease-in-out w-full relative"
                style={{
                    transform: `translateX(-${
                        currentIndex * (100 / images.length)
                    }%)`,
                    width: `${images.length * 100}%`,
                }}
            >
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0) 50%,rgba(0,0,0,0.5) 100%)',
                    }}
                ></div>
                {/* Images */}
                {images.map((imageUrl, index) => (
                    <div key={index} className="w-full h-[570px] object-cover">
                        <img
                            src={imageUrl}
                            alt={`Slide ${index}`}
                            className="w-full h-full object-cover"
                        />
                        {/* <div className="absolute inset-0 flex items-center justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                                Shop Now
                            </button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

function Home() {
    const images = [
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713254811/n43hccvhjw53mcqt4y0s.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713254805/cx3kes0kx1jvrgo8sdni.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1714574519/lugwtmo5frftmbl8arow.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1714574516/rv6akq6plnizkzhohgh4.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713523173/pdllkh07cwyuwtpr6ma0.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713944396/aep9j4vbebq36iwkdpwo.jpg',
    ]

    return (
        <div className="container mx-auto p-5">
            <Carousel images={images} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {/* Product Cards */}
                {[1, 2, 3].map((product) => (
                    <div
                        key={product}
                        className="bg-white rounded-lg shadow-md p-6 relative"
                    >
                        <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white py-1 px-2 rounded-tl-lg rounded-tr-lg">
                            New Arrival
                        </div>
                        <h2 className="text-xl font-bold mb-4 mt-6">
                            Product {product}
                        </h2>
                        <p className="text-gray-700">
                            Description of Product {product} goes here.
                        </p>
                        <div className="mt-6 flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-800">
                                $99.99
                            </span>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
