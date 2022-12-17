function Avatar({fName, image}) {
    return (
        <div >
            <img src={image} alt={fName} />
        </div>
    )
}

export default Avatar