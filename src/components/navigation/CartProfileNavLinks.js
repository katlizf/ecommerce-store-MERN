import {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

function CartProfileNavLinks() {

    const auth = useContext(AuthContext)

    return (
        <ul className='links'>
            <li>
                <NavLink to=''>
                    <i className="icon-shopping-cart"></i>
                </NavLink>
            </li>
            {!auth.isLoggedIn &&
                <li>
                    <NavLink to='/Auth'>Login</NavLink>
                </li>
            }
            {auth.isLoggedIn && 
                <li className='dropdown'>
                    <NavLink to={`/${auth.userId}/Profile`} className='dropdown-btn' >Profile</NavLink>
                    <div className='dropdown-options'>
                        <button className='logout' onClick={auth.logout}>Logout</button>
                    </div>
                </li>
            }
        </ul>
    )
}

export default CartProfileNavLinks