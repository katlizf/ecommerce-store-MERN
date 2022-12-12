import Product from "./product/Product"
import PageContainer from "../pageContainer/PageContainer"

function Products(props) {

    if (props.items.length === 0) {
        return (
            <div>
                <h2>No Products Found.</h2>
            </div>
        )
    }

    return (
        <PageContainer>
            <ul>
              {props.items.map(product => (
                    <Product
                        key={product.id}
                        id={product.id}
                        productName={product.productName}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                    />
                ))}  
            </ul>
        </PageContainer>
    )
}

export default Products