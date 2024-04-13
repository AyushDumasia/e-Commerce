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
                <h2 className="text-2xl font-bold mb-5 text-start">My Cart</h2>
            </div>
            <div className="overflow-y-auto max-h-[400px]">
                <CartCard />
            </div>
            <div className="flex justify-between item-center mt-[50px] bg-[#d7d7da]">
                <p className="font-bold  text-start">
                    {cart?.totalPrice === 0 ? (
                        <p>Nothing in cart</p>
                    ) : (
                        <p>Total Price: ₹{cart?.totalPrice}</p>
                    )}
                </p>

                <button
                    onClick={orderBtn}
                    className="bg-blue-500 text-white px-6 py-3  md:mr-4 rounded hover:bg-blue-600"
                >
                    Order Now
                </button>
            </div>
        </div>
    )
}

export default Cart
