import Footer from './../Cards/Home/Footer'
import Hero from '../Cards/Home/Hero'
import axios from 'axios'
import CategoryCard from '../Cards/Home/CategroryCard'
import {useState} from 'react'

function App() {
    // const [product, setProduct] = useState([])
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
        // Add more categories as needed
    ]

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('/api/product/showLatestProducts')
    //         console.log(response.data.data)
    //         setProduct(response.data.data)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    // useState(() => {
    //     fetchData()
    // })

    return (
        <div className="bg-gray-100">
            <Hero />
            <div className="flex flex-wrap justify-center gap-6 p-6">
                {categories.map((category, index) => (
                    <CategoryCard key={index} category={category} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default App
