import ReactDOM from "react-dom"

function Backdrop(props) {
	return ReactDOM.createPortal(
		<div className="backdrop" onClick={props.onClick}></div>,
		document.getElementById("backdrop-hook")
	)
}

export default Backdrop