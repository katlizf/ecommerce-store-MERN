import {NavLink} from 'react-router-dom'
import './NavLinks.scss'

function NavLinks() {
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='/Apparel'>Apparel</NavLink>
            </li>
            <li>
                <NavLink to='/Collectables'>Collectables</NavLink>
            </li>
            <li>
                <NavLink to='/Profile'> My Profile</NavLink>
            </li>
        </ul>
    )
}

export default NavLinks