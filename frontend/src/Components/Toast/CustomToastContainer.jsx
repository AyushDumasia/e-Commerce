import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './CustomToastContainer.css'
import React from 'react'
import './CustomToastContainer.css'

function CustomToastContainer() {
    return (
        <div>
            <ToastContainer
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                draggable
            />
        </div>
    )
}

export default CustomToastContainer
