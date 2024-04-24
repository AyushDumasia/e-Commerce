import React, {useState} from 'react'
import {MdKeyboardArrowLeft} from 'react-icons/md'
import {MdKeyboardArrowRight} from 'react-icons/md'
function Slider() {
    const images = [
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713254811/n43hccvhjw53mcqt4y0s.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713254808/kcwcu5rwwarjuwcbkgmg.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713254805/cx3kes0kx1jvrgo8sdni.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713255103/ctoxxlwfwc8yrbhfql0c.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713091017/y4e7hs5afoygkvqkabjc.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713091058/cw4gvw6oz5ik44p3yjtv.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713250108/aitqbjz0bnt1gegui5ra.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713254809/d8axa5it78l8pcv8vovx.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1713255101/vk1vyg8gd4d3x4ciuynl.jpg',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1712976049/oajqjkrkgdkr4e8jggyr.png',
        'https://res.cloudinary.com/dxrzskzvj/image/upload/v1711635038/cld-sample-5.jpg',
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1,
        )
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1,
        )
    }

    return (
        <div className="flex items-center justify-evenly p-2">
            <button
                onClick={goToPrevious}
                className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center mr-2"
            >
                <MdKeyboardArrowLeft />
            </button>
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="rounded-full w-16 h-16 object-cover"
            />
            <img
                src={images[currentIndex + 1]}
                alt={`Slide ${currentIndex + 1}`}
                className="rounded-full w-16 h-16 object-cover"
            />
            <img
                src={images[currentIndex + 2]}
                alt={`Slide ${currentIndex + 2}`}
                className="rounded-full w-16 h-16 object-cover"
            />
            <img
                src={images[currentIndex + 3]}
                alt={`Slide ${currentIndex + 2}`}
                className="rounded-full w-16 h-16 object-cover"
            />
            <img
                src={images[currentIndex + 4]}
                alt={`Slide ${currentIndex + 2}`}
                className="rounded-full w-16 h-16 object-cover"
            />
            <img
                src={images[currentIndex + 5]}
                alt={`Slide ${currentIndex + 2}`}
                className="rounded-full w-16 h-16 object-cover"
            />
            <img
                src={images[currentIndex + 6]}
                alt={`Slide ${currentIndex + 2}`}
                className="rounded-full w-16 h-16 object-cover"
            />
            <button
                onClick={goToNext}
                className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center ml-2"
            >
                <MdKeyboardArrowRight />
            </button>
        </div>
    )
}

export default Slider
