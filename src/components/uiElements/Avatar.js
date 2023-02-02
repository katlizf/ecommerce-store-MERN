function Avatar({fName, image}) {
    return (
        <div className="avatar">
            <img src={image} alt={fName} />
        </div>
    )
}

export default Avatar