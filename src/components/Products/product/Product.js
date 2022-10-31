import Button from "../formElements/button/Button"

function Product(props) {
    return (
        <div>
            <div>
                <img src={props.image} alt={props.productName} />
            </div>
            <div>
                <h2>{props.productName}</h2>
                <h3>{props.description}</h3>
            </div>
            <div>
                <h2>{props.price}</h2>
                <Button>Add to Cart</Button>
            </div>
        </div>
    )
}

export default Product