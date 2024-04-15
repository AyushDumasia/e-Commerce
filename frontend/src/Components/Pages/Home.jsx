import React from 'react'

function Home() {
    return (
        <div className="relative">
            {/* Background Image */}
            <img
                // src="https://res.cloudinary.com/dxrzskzvj/image/upload/v1712998161/sg2dixlciritt6llc0zv.jpg"
                src="https://res.cloudinary.com/dxrzskzvj/image/upload/v1713001482/lv5eg44embc6dxpsm9ju.jpg"
                // src="https://res.cloudinary.com/dxrzskzvj/image/upload/v1712998194/pirbwo9eiazxe7t3itz1.jpg"
                alt="Background"
                className="w-full h-screen object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Text Overlay */}
            <div className="absolute top-[40%] left-[20px] transform -translate-y-1/2 text-white p-8">
                <div className="w-[80%]">
                    <h1 className="text-[4.5rem]  font-extrabold mb-4 text-[#ffffff]">
                        Welcome to Our Website
                    </h1>
                    <p className="text-lg">
                        Shop the latest trends in fashion, electronics, and
                        more, all in one convenient place. Experience seamless
                        shopping with secure payments and swift delivery.
                    </p>
                </div>
                <button className="bg-[blue] font-bold p-4 mt-[15px] rounded-3xl text-white">
                    Explore Now
                </button>
            </div>
        </div>
    )
}

export default Home
