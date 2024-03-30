import {useState} from 'react'

function Input({label, type, placeholder, value, name, handler}) {
    let [data, setData] = useState({})
    const handleData = (e) => {
        setData({...data, [e.target.id]: e.target.value})
    }
    return (
        <div className="mb-[5px] w-full">
            <label htmlFor={label} className="text-lg">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                id={label}
                name={name}
                value={value}
                onChange={handler}
                className="border p-2 rounded mt-[3px] w-full text-base focus:outline-none"
            />
        </div>
    )
}

export default Input
