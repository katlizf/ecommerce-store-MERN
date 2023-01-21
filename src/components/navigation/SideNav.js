import {CSSTransition} from "react-transition-group"
import ReactDOM from "react-dom"

function SideNav(props) {

	const content = (
		<CSSTransition
			in={props.show}
			timeout={200}
			classNames="slide-in-left"
			mountOnEnter
			unmountOnExit
		>
			<aside className="side-nav" onClick={props.onClick}>
				{props.children}
			</aside>
		</CSSTransition>
	)

	return ReactDOM.createPortal(
		content,
		document.getElementById("side-nav-hook")
	)
}

export default SideNav