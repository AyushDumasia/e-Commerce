import React from 'react'

const Popover = ({product}) => {
    const handleMouseEnter = (e) => {
        const {left, top, width, height} = e.target.getBoundingClientRect()
        const offsetX = e.clientX - left
        const offsetY = e.clientY - top
        const magnifierSize = 100 // Adjust magnifier size as needed
        const maxX = width - magnifierSize
        const maxY = height - magnifierSize
        setMagnifierPosition({
            x: Math.min(Math.max(0, offsetX - magnifierSize / 2), maxX),
            y: Math.min(Math.max(0, offsetY - magnifierSize / 2), maxY),
        })
    }
    return <div className="popover">{handleMouseEnter()}</div>
}

export default Popover
