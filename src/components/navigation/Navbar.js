import MainHeader from "./MainHeader"
import {Link} from 'react-router-dom'
import NavLinks from "./NavLinks"
import './Navbar.scss'

function Navbar(props) {
    return (
        <MainHeader>
            <button className="menu-btn">
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-title">
                <Link to='/'>Weebs-R-Us</Link>                
            </h1>
            <nav>
                <NavLinks />
            </nav>
        </MainHeader>
    )
}

export default Navbar