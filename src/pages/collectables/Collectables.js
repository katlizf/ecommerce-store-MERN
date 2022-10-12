import Products from "../../components/product/Products/Products"

function Collectables() {

    const PRODUCTS = [{
        id: '2',
        productName: 'Figurine',
        description: 'Dimensions 7" Tall',
        price: 39.99,
        anime: 2,
        image: 'Image',
        type: 2
    }]

    return (
        <div>
            <Products items={PRODUCTS} />
        </div>
    )
}

export default Collectables