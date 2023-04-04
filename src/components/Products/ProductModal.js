import Button from "../formElements/Button"

function ProductModal({productName, description, price, image}) {
	return (
		<div className="product-modal">
			<div className="product-details">
				<img className="image" src={image} alt={productName} />
				<div className="text-info">
					<h2 className="name">{productName}</h2>
					<h3 className="description">{description}</h3>
					<div className="sizes">
						<button type="radio" className="size" id="xs">
							X-small
						</button>
						<button type="radio" className="size" id="s">
							Small
						</button>
						<button type="radio" className="size" id="m">
							Medium
						</button>
						<button type="radio" className="size" id="l">
							Large
						</button>
						<button type="radio" className="size" id="xl">
							X-large
						</button>
					</div>
					<h3 className="price">${price}</h3>
					<Button className="cart-btn">
						<p className="add-to-cart">Add to Cart</p>
						<i className="icon-shopping-cart"></i>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ProductModal
