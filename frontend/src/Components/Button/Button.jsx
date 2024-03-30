import React from 'react'

function Button({text}) {
    return (
        <button className="bg-black p-3 mt-3 w-full rounded text-white hover:bg-primary">
            {text}
        </button>
    )
}

export default Button
