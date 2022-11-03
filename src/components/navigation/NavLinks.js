import {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

function NavLinks() {

    const auth = useContext(AuthContext)

    return (
        <ul className='nav-links'>
            <li>
                <NavLink to='/' exact>Home</NavLink>
            </li>
            <li>
                <NavLink to='/Apparel'>Apparel</NavLink>
            </li>
            <li>
                <NavLink to='/Collectables'>Collectables</NavLink>
            </li>
            {!auth.isLoggedIn &&
                <li>
                    <NavLink to='/Auth'>Login</NavLink>
                </li>
            }
            {auth.isLoggedIn && 
                <li>
                    <NavLink to='/Profile'> My Profile</NavLink>
                </li>
            }
            {auth.isLoggedIn &&
                <li>
                    <button onClick={auth.logout}>Logout</button>
                </li>
            }
        </ul>
    )
}

export default NavLinks