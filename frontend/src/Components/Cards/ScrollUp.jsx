import React, {useState} from 'react'

const ScrollUp = () => {
    const [isVisible, setIsVisible] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const handleScroll = () => {
        const scrollTop = window.pageYOffset
        if (scrollTop > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    window.addEventListener('scroll', handleScroll)

    return (
        <button
            className={`scroll-to-top ${isVisible ? 'show' : 'hide'}`}
            onClick={scrollToTop}
        >
            ↑
        </button>
    )
}

export default ScrollUp
