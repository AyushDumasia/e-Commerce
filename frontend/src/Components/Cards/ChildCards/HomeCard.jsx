import React from 'react'
import {motion, useMotionValue, useTransform} from 'framer-motion'

const HomeCard = ({product}) => {
    const x = useMotionValue(0.5)
    const y = useMotionValue(0.5)

    // Define the transform properties for the rotation
    const rotateX = useTransform(y, [0, 1], [-15, 15])
    const rotateY = useTransform(x, [0, 1], [-15, 15])

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const xValue = (e.clientX - rect.left) / rect.width
        const yValue = (e.clientY - rect.top) / rect.height
        x.set(xValue)
        y.set(yValue)
    }

    const handleMouseLeave = () => {
        x.set(0.5)
        y.set(0.5)
    }

    return (
        <p className="text-[black]">{HomeCard.productName} </p>
        // <motion.div
        //     className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        //     style={{perspective: 1000}}
        //     onMouseMove={handleMouseMove}
        //     onMouseLeave={handleMouseLeave}
        //     animate={{rotateX, rotateY}}
        //     whileHover={{scale: 1.05}}
        //     whileTap={{scale: 0.95}}
        // >
        //     <motion.img
        //         className="w-full h-48 object-cover"
        //         src={product?.image}
        //         alt={product?.productName}
        //         initial={{opacity: 0}}
        //         animate={{opacity: 1}}
        //         transition={{duration: 1}}
        //     />
        //     <div className="p-4">
        //         <h3 className="text-lg font-semibold text-gray-800">
        //             {product?.productName}
        //         </h3>
        //         <div className="flex items-center mt-2">
        //             <div className="text-yellow-400">
        //                 {'★'.repeat(product?.rating)}
        //                 {'☆'.repeat(5 - product?.rating)}
        //             </div>
        //             <span className="ml-2 text-gray-600">
        //                 {product?.rating}
        //             </span>
        //         </div>
        //         <div className="mt-2">
        //             <span className="text-2xl font-bold text-gray-800">
        //                 ${product?.price}
        //             </span>
        //         </div>
        //         <motion.button
        //             className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600 transition duration-300"
        //             whileHover={{scale: 1.05}}
        //             whileTap={{scale: 0.95}}
        //         >
        //             Add to Cart
        //         </motion.button>
        //     </div>
        // </motion.div>
    )
}

export default HomeCard
