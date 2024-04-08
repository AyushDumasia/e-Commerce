import CustomToastContainer from './Toast/CustomToastContainer'
import {useNavigate} from 'react-router-dom'
import CartCard from './Cards/CartCard.jsx'
import {useSelector} from 'react-redux'

const Cart = () => {
    const {cart} = useSelector((state) => state.cart)
    const navigate = useNavigate()

    const orderBtn = () => {
        navigate('/order').catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="container mx-auto">
            <CustomToastContainer />
            <div className="text-center py-8">
                <h1 className="font-bold text-start text-2xl">My Cart</h1>
            </div>
            <CartCard />
            <p className="font-bold mt-4 text-start">
                Total Price: ₹{cart?.totalPrice}
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
