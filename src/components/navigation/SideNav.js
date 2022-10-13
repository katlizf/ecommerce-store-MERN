import ReactDOM from 'react-dom'
import './SideNav.scss'

function SideNav(props) {
    const content = (
        <aside className='side-nav'>
            {props.children}
        </aside>
    )
    return ReactDOM.createPortal(content, document.getElementById('side-nav-hook'))
}

export default SideNav