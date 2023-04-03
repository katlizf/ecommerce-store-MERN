import {useState} from "react"
import Button from "../formElements/Button"
import Modal from "../uiElements/Modal"
import ProductModal from "./ProductModal"

function Product(props) {

	const [modalOpen, setModalOpen] = useState(false)

	const openProductModal = e => {
		setModalOpen(true)
	}

	const closeProductModal = e => {
		setModalOpen(false)
	}

	return (
		<div className="product-card">
			<img className="image" src={props.image} alt={props.productName} />
			<h2 className="name">{props.productName}</h2>
			<div className="price-cart">
				<h2 className="price">${props.price}</h2>
				<Button className="cart-btn" onClick={openProductModal}>
					<p className="add-to-cart">Add to Cart</p>
					<i className="icon-shopping-cart"></i>
				</Button>
			</div>
			<Modal show={modalOpen} onCancel={closeProductModal}>
				<ProductModal productName={props.productName} description={props.description} price={props.price} image={props.image} />
			</Modal>
		</div>
	)
}

export default Product
