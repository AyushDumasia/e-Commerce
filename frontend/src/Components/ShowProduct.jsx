import React, {useEffect, useState} from 'react'
import axios from 'axios'
function ShowProduct() {
    const [product, setProduct] = useState([])

    const fetchData = () => {
        try {
            const response = axios.get(
                'http://localhost:3000/api/product/showProduct',
            )
            console.log(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    })
    return <div></div>
}

export default ShowProduct
