import './SideNav.scss'

function SideNav(props) {
    return (
        <aside className='side-nav'>
            {props.children}
        </aside>
    )
}

export default SideNav