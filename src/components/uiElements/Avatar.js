function Avatar({fName, image}) {
    console.log(image)
    return (
        <div >
            <img
                src={image}
                alt={fName}
            />
        </div>
    )
}

export default Avatar