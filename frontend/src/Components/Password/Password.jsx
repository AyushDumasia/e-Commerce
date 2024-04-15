import {useState} from 'react'
import {FaEye, FaEyeSlash} from 'react-icons/fa'

function Password({label, placeholder, name, value, handler}) {
    let [showPassword, setShowPassword] = useState(false)

    return (
        <div className="mb-[5px] w-full">
            <label htmlFor={label} className="text-lg">
                {label}
            </label>
            <div className="relative">
                <input
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder={placeholder}
                    id={label}
                    name={name}
                    value={value}
                    onChange={handler}
                    className="relative border border-[grey] p-2 pr-8 rounded mt-[3px] w-full text-base focus:outline-none"
                />
                <div
                    className="absolute right-2 top-0 transform translate-y-[100%] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
            </div>
        </div>
    )
}

export default Password
