import {useState} from "react"
import {Link} from "react-router-dom"
import MainHeader from "./MainHeader"
import NavLinks from "./NavLinks"
import SideNav from "./SideNav"
import Backdrop from "../uiElements/Backdrop"
import CartProfileNavLinks from "./CartProfileNavLinks"

function Navbar() {

	const [sideNavOpen, setSideNavOpen] = useState(false)

	const openSideNav = () => {
		setSideNavOpen(true)
	}
	const closeSideNav = () => {
		setSideNavOpen(false)
	}

	return (
		<div>
			{sideNavOpen && <Backdrop onClick={closeSideNav} />}
			<SideNav show={sideNavOpen} onClick={closeSideNav}>
				<nav className="side-nav">
					<NavLinks />
				</nav>
			</SideNav>
			<MainHeader>
				<h1 className="main-title">
					<Link to="/">Weebs-R-Us</Link>
				</h1>
				<div className="navlinks">
					<nav className="header-nav">
						<NavLinks />
					</nav>
					<CartProfileNavLinks />
					<button className="menu-btn" onClick={openSideNav}>
						<span />
						<span />
						<span />
					</button>
				</div>
			</MainHeader>
		</div>
	)
}

export default Navbar