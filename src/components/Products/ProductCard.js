import {useState} from "react"
import Button from "../formElements/Button"
import ProductModal from "./ProductModal"

function Product(props) {

    const [modalOpen, setModalOpen] = useState(false)

    const openProductModal = e => {
        setModalOpen(prevMode => !prevMode)
    }

	return (
		<div className="product-card">
            <img className="image" src={props.image} alt={props.productName} />
            <div className="name-desc">
			    <h2 className="name">{props.productName}</h2>
			    <h3 className="description">{props.description}</h3>
            </div>
            <div className="price-cart">
                <h2 className="price">${props.price}</h2>
			    <Button className="cart-btn" onClick={openProductModal}>
                    <p className="add-to-cart">Add to Cart</p>
                    <i className="icon-shopping-cart"></i>
                </Button>
                {modalOpen && <ProductModal />}
            </div>
		</div>
	)
}

export default Product
