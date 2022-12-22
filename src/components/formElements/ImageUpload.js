import {useEffect, useRef, useState} from 'react'
import Button from "./Button"

function ImageUpload(props) {

    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const filePickerRef = useRef()

    useEffect(() => {
        if (!file) {
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
        // create a url I can output

    }, [file])

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

    const pickHandler = e => {
        let pickedFile

        if (e.target.files & e.target.files.length === 1) {
            pickedFile = e.target.files[0]
            setFile(pickedFile)
            return
        }
        props.onInput(props.id, pickedFile)
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
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <img src={props.image} alt={props.fName} />}
                </div>
                <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
            </div>
        </div>
    )
}

export default ImageUpload