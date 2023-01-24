import Button from "../formElements/Button"

function Product(props) {
	return (
		<div className="product-card">
            <div className="img-name-desc">
                <img className="image" src={props.image} alt={props.productName} />
			    <h2 className="name">{props.productName}</h2>
			    <h3 className="description">{props.description}</h3>
            </div>
            <div className="price-cart">
                <h2 className="price">{props.price}</h2>
			    <Button className="cart-btn">
                    <p className="add-to-cart">Add to Cart</p>
                    <i className="icon-shopping-cart"></i>
                </Button>
            </div>
		</div>
	)
}

export default Product
