import {Flip, ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './CustomToastContainer.css'
import React from 'react'
// import './CustomToastContainer.css'

function CustomToastContainer() {
    return (
        <div>
            <ToastContainer
                autoClose={500}
                hideProgressBar={true}
                newestOnTop={false}
                position="top-center"
                transition:closeOnClick
                draggable
            />
        </div>
    )
}

export default CustomToastContainer
