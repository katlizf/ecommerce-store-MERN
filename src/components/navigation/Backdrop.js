import ReactDOM from 'react-dom'
import './Backdrop.scss'

function Backdrop(props) {
    return (
        ReactDOM.createPortal(
            <div className='backdrop' onClick={props.onClick}></div>,
            document.getElementById('backdrop-hook')
        )
    )
}

export default Backdrop