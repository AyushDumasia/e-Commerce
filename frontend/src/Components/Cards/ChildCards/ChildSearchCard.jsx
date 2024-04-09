import React from 'react'
import Rating from 'react-rating-stars-component'

export default function ChildCard({item, showProduct}) {
    return (
        <div
            onClick={() => showProduct(item._id)}
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            <img
                src={item.coverImage}
                alt={item.productName}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                    {item.productName}
                </h2>
                <p className="text-gray-700">₹{item.price}</p>
                <Rating
                    value={item.rating}
                    count={5}
                    size={20}
                    activeColor="orange"
                    edit={false}
                    isHalf={true}
                />
            </div>
        </div>
    )
}
