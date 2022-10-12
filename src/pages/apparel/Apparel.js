import Products from "../../components/Products/Products"

function Apparel() {

    const PRODUCTS = [{
        id: '1',
        productName: 'Sweatshirt',
        description: 'Grey',
        price: 19.99,
        anime: 1,
        image: 'Image',
        type: 1
    }]

    return (
        <div>
            <Products items={PRODUCTS} />
        </div>
    )
}

export default Apparel