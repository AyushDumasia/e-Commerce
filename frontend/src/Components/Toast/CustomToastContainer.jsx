import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './CustomToastContainer.css'
import React from 'react'

function CustomToastContainer() {
    return (
        <div>
            <ToastContainer
                autoClose={100}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                draggable
            />
        </div>
    )
}

export default CustomToastContainer
