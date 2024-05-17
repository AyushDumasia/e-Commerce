import React from 'react'
import ReactLoading from 'react-loading'

const LoadingComponent = () => {
    return (
        <div className="flex h-[90%] justify-center items-center overflow-hidden">
            <ReactLoading type={'spin'} color={'blue'} height={50} width={50} />
        </div>
    )
}

export default LoadingComponent
