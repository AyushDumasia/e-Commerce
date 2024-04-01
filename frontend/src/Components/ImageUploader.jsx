// ImageUploader.jsx
import React, {useState} from 'react'

function ImageUploader() {
    const [image, setImage] = useState()

    const handleSubmit = () => {
        console.log(image)
    }

    return (
        <div>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={handleSubmit}>Click</button>
        </div>
    )
}

export default ImageUploader
