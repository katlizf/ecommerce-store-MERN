import ReactDom from 'react-dom'
import {CSSTransition} from 'react-transition-group'
import Backdrop from './Backdrop'

const ModalOverlay = props => {
    const content = (
        <div className={`modal ${props.className}`}>
            <header className={`modal-header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form 
                onSubmit={props.onSubmit ? props.onSubmit: e => e.preventDefault()}
            >
                <div className={`modal-content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal-footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    )
    return ReactDom.createPortal(content, document.getElementById('modal-hook'))
}

function Modal(props) {
    return (
        <>
            {props.show && <Backdrop onClick={props.onCancel} />}
        <CSSTransition
            in={props.show}
            mountOnEnter
            unmountOnExit
            timeout={200}
            classNames='modal'
        >
            <ModalOverlay {...props} />
        </CSSTransition>
        </>
    )
}

export default Modal