import {useEffect, useRef, useState} from "react"
import Button from "./Button"

function ImageUpload(props) {

	const [file, setFile] = useState()
	const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)
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

	const pickHandler = e => {
		let pickedFile
        let fileIsValid = isValid
		if (e.target.files && e.target.files.length === 1) {
			pickedFile = e.target.files[0]
			setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true
            // done because setIsValid is not updated immediately so set fileIsValid manually
		} else {
            setIsValid(false)
            fileIsValid = false
        }
		props.onInput(props.id, pickedFile, fileIsValid)
	}

	const pickImageHandler = () => {
		filePickerRef.current.click()
	}

	return (
		<div className="image-upload-form">
			<input
				id={props.id}
				ref={filePickerRef}
				style={{display: "none"}}
				type="file"
				accept=".jpg, .png, .jpeg"
				onChange={pickHandler}
			/>
			<div className="image-upload">
				<div className="image-upload-preview">
					{previewUrl && <img src={previewUrl} alt="Preview" />}
					{!previewUrl && <p>Please pick an image for your profile.</p>}
				</div>
				<Button className="pick-image-btn" type="button" onClick={pickImageHandler}>
					Pick Image
				</Button>
			</div>
            {/* {!isValid && <p>{props.errorText}</p>} */}
		</div>
	)
}

export default ImageUpload