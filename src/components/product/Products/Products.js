import Product from "../Product"

function Products(props) {

    if (props.items.length === 0) {
        return (
            <div>
                <h2>No Products Found</h2>
            </div>
        )
    }

    return (
        <div>
            {props.items.map(product => {
                return (
                    <Product
                        key={product.id}
                        id={product.id}
                        productName={product.productName}
                        description={product.description}
                        price={product.price}
                        image={product.image} />
                )
            })}
        </div>
    )
}

export default Products