import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CustomToastContainer from './../Toast/CustomToastContainer'
import axios from 'axios'
import CartCard from './../Cards/CartCard'
import {toast} from 'react-toastify'

const Cart = () => {
    const {cart} = useSelector((state) => state.cart)
    const navigate = useNavigate()

    const orderBtn = async () => {
        try {
            const response = await axios.get('/api/product/cart', {
                withCredentials: true,
            })
            if (response.status === 202) {
                return toast.error('Nothing in Cart')
            }
            const addressResponse = await axios.get(
                '/api/address/fetchAddress',
                {
                    withCredentials: true,
                },
            )
            const saveOrder = localStorage.setItem(
                'order',
                JSON.stringify(response.data.cartItems),
            )
            if (addressResponse.status === 202) {
                return navigate('/createAddress')
            }
            return navigate('/address')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container mx-auto flex flex-col md:flex-row justify-evenly p-5 gap-6">
            <CustomToastContainer />
            <div className="w-full md:w-2/3 bg-white rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-5 text-start">My Cart</h2>
                <div className="overflow-y-auto max-h-96">
                    <CartCard />
                </div>
            </div>
            <div className="w-full md:w-1/4 bg-white text-black rounded-lg p-5 flex flex-col justify-between   h-[300px] mt-[50px]">
                <h1 className="text-2xl font-semibold mb-4">Summary</h1>
                <div className="flex self-start flex-col">
                    <div className="mb-[20px] flex flex-col gap-2">
                        <h2>Subtotal : &nbsp;&nbsp;₹{cart?.totalPrice ?? 0}</h2>
                        <h2>Quantity({cart?.count ?? 0})</h2>
                        <h2>
                            Shipping Charges: &nbsp;&nbsp;₹
                            {cart?.totalPrice / 4 || 0}
                        </h2>
                    </div>
                </div>
                <div>
                    <div className="font-bold flex justify-between text-xl">
                        <div>Total</div>
                        <div>
                            ₹
                            {Number(cart?.totalPrice ?? 0) +
                                (cart?.totalPrice ?? 0) / 4}
                        </div>
                    </div>
                    <button
                        className="mt-5 bg-[#017acb] text-white py-2 px-4 rounded-sm w-full font-bold hover:bg-[#0e66a0]"
                        onClick={orderBtn}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart
