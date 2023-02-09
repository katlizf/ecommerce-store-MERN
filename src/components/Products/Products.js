import ProductCard from "./ProductCard"

function Products(props) {
    
	if (props.items.length === 0) {
		return (
			<div>
				<h2>No Products Found.</h2>
			</div>
		)
	}

	return (
		<div>
			<ul className="products">
				{props.items.map(product => (
					<ProductCard
						key={product.id}
						id={product.id}
						productName={product.productName}
						description={product.description}
						price={product.price}
						image={product.image}
					/>
				))}
			</ul>
		</div>
	)
}

export default Products