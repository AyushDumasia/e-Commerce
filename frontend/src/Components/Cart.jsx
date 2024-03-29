import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Cart() {
    const [cartData, setCartData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/product/cart',
                    {withCredentials: true},
                )
                setCartData(response.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <h1>Cart</h1>
            {loading && <p>Loading...</p>}
            {cartData && (
                <div>
                    <p>Total Items: {cartData.count}</p>
                    <p>Total Price: ₹{cartData.totalPrice}</p>
                    <ul>
                        {cartData.cartItems.map((item, index) => (
                            <li key={index}>
                                Product: {item.productName}, Quantity:{' '}
                                {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Cart
