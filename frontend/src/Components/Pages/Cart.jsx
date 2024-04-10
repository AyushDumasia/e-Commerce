import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CustomToastContainer from './../Toast/CustomToastContainer'
import axios from 'axios'
import CartCard from './../Cards/CartCard'

const Cart = () => {
    const {cart} = useSelector((state) => state.cart)
    const navigate = useNavigate()

    const orderBtn = async () => {
        try {
            const res = await axios.post(
                'http://localhost:3000/api/order/createOrder',
                null,
                {
                    withCredentials: true,
                },
            )
            navigate('/order')
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container mx-auto">
            <CustomToastContainer />
            <div className="text-center pt-5 pb-1">
                <h1 className="font-bold text-start text-2xl">My Cart</h1>
            </div>
            <CartCard />
            <p className="font-bold mt-4 text-start">
                {cart?.totalPrice === 0 ? (
                    <p>Nothing in cart</p>
                ) : (
                    <p>Total Price: ₹{cart?.totalPrice}</p>
                )}
            </p>

            <button
                onClick={orderBtn}
                className="bg-blue-500 text-white px-6 py-3 my-2 md:mr-4 rounded hover:bg-blue-600"
            >
                Order Now
            </button>
        </div>
    )
}

export default Cart
