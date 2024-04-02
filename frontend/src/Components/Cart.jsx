import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Cart() {
    const [cart, setCart] = useState({cartItems: [], totalPrice: '0.00'})

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/product/cart',
                {withCredentials: true},
            )
            setCart(response.data)
        } catch (error) {
            console.error('Error fetching cart data:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const increaseQuantity = (itemId) => {
        const updatedCart = {...cart}
        const itemIndex = updatedCart.cartItems.findIndex(
            (item) => item._id === itemId,
        )
        if (itemIndex !== -1) {
            updatedCart.cartItems[itemIndex].quantity++
            setCart(updatedCart)
        }
    }

    const decreaseQuantity = (itemId) => {
        const updatedCart = {...cart}
        const itemIndex = updatedCart.cartItems.findIndex(
            (item) => item._id === itemId,
        )
        if (itemIndex !== -1 && updatedCart.cartItems[itemIndex].quantity > 1) {
            updatedCart.cartItems[itemIndex].quantity--
            setCart(updatedCart)
        }
    }

    return (
        <div>
            <div style={{textAlign: 'center', padding: '20px'}}>
                <h2>Cart</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {cart.cartItems.map((item) => (
                        <div
                            key={item._id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                padding: '10px',
                                marginBottom: '10px',
                                width: '80%',
                            }}
                        >
                            <img
                                src={item.productId.coverImage}
                                alt={item.productId.productName}
                                style={{
                                    width: '100px',
                                    height: 'auto',
                                    marginRight: '20px',
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <h3>{item.productId.productName}</h3>
                                <p>Category: {item.productId.category}</p>
                                <p>Description: {item.productId.description}</p>
                                <p>Price: ${item.productId.price}</p>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <button
                                        onClick={() =>
                                            decreaseQuantity(item._id)
                                        }
                                    >
                                        -
                                    </button>
                                    <p style={{margin: '0 10px'}}>
                                        {item.quantity}
                                    </p>
                                    <button
                                        onClick={() =>
                                            increaseQuantity(item._id)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p style={{fontWeight: 'bold', marginTop: '20px'}}>
                    Total Price: ${cart.totalPrice}
                </p>
            </div>
        </div>
    )
}

export default Cart
