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
        <div className="relative overflow-hidden">
            <div
                className="flex transition-transform duration-1000 ease-in-out w-95"
                style={{
                    transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
                    width: `${images.length * 100}%`,
                    marginTop: '10px',
                }}
            >
                {images.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        alt={`Slide ${index}`}
                        className="w-full h-[570px] object-cover"
                    />
                ))}
            </div>
        </div>
    )
}

function Home() {
    const images = [
        // 'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713254811/xvttg8jissobs5lw5q4r.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713254811/n43hccvhjw53mcqt4y0s.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713254808/kcwcu5rwwarjuwcbkgmg.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713254805/cx3kes0kx1jvrgo8sdni.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713255103/ctoxxlwfwc8yrbhfql0c.jpg',
    ]

    return (
        <>
            <Carousel images={images} />
            <Slider />
        </>
    )
}

export default Home
