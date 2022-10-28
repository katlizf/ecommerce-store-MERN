import MainHeader from "./MainHeader"
import {Link} from 'react-router-dom'
import NavLinks from "./NavLinks"
import SideNav from "./SideNav"
import {useState} from 'react'
import Backdrop from './Backdrop'

function Navbar(props) {

    const [sideNavOpen, setSideNavOpen] = useState(false)

    const openSideNav = () => {
        setSideNavOpen(true)
    }
    const closeSideNav = () => {
        setSideNavOpen(false)
    }

    return (
        <div>
            {sideNavOpen && <Backdrop onClick={closeSideNav}/>}
            <SideNav show={sideNavOpen} onClick={closeSideNav}>
                <nav className="side-nav">
                    <NavLinks />         
                </nav>
            </SideNav>
            <MainHeader>
                <button className="menu-btn" onClick={openSideNav}>
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