import Product from "../product/Product"
import PageContainer from "../pageContainer/PageContainer"

function Products(props) {

    if (props.items.length === 0) {
        return (
            <div>
                <h2>No Products Found</h2>
            </div>
        )
    }

    return (
        <PageContainer>
            {props.items.map(product => {
                return (
                    <Product
                        key={product.id}
                        id={product.id}
                        productName={product.productName}
                        description={product.description}
                        price={product.price}
                        anime={product.anime}
                        image={product.image}
                        type={product.type} />
                )
            })}
        </PageContainer>
    )
}

export default Products