import Button from "../formElements/Button"

function Product(props) {
    return (
        <div className="product-card">
            <img src={props.image} alt={props.productName} />
            <h2 className="name">{props.productName}</h2>
            <h3 className="description">{props.description}</h3>
            <h2 className="price">{props.price}</h2>
            <Button className="add-to-cart">Add to Cart</Button>        
        </div>
    )
}

export default Product