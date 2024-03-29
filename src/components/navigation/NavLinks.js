import {NavLink} from "react-router-dom"

function NavLinks() {
	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/Apparel">Apparel</NavLink>
			</li>
			<li>
				<NavLink to="/Collectables">Collectables</NavLink>
			</li>
		</ul>
	)
}

export default NavLinks