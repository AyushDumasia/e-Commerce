import React from 'react'
import ReactLoading from 'react-loading'

const LoadingComponent = () => {
    return (
        <div className="flex h-full justify-center items-center">
            <ReactLoading
                type={'spin'}
                color={'black'}
                height={50}
                width={50}
            />
        </div>
    )
}

export default LoadingComponent
