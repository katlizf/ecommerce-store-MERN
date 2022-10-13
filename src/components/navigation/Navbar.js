import MainHeader from "./MainHeader"
import {Link} from 'react-router-dom'
import NavLinks from "./NavLinks"
import SideNav from "./SideNav"
import './Navbar.scss'

function Navbar(props) {
    return (
        <div>
            <SideNav >
                <nav className="side-nav">
                    <NavLinks />         
                </nav>
            </SideNav>
            <MainHeader>
                <button className="menu-btn">
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-title">
                    <Link to='/'>Weebs-R-Us</Link>                
                </h1>
                <nav className="header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </div>
    )
}

export default Navbar