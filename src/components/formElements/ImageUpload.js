import {useRef} from 'react'
import Button from "./Button"

function ImageUpload(props) {

    const filePickerRef = useRef()

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

    const pickHandler = e => {
        console.log(e.target)
    }

    return (
        <div>
            <input
                id={props.id}
                ref={filePickerRef}
                style={{display: 'none'}}
                type="file"
                accept='.jpg, .png, .jpeg'
                onChange={pickHandler}
            />
            <div className="image-upload">
                <div className="image-upload-preview">
                    <img src="" alt="preview" />
                </div>
                <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
            </div>
        </div>
    )
}

export default ImageUpload