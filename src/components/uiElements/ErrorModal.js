import Modal from "./Modal"
import Button from '../formElements/button/Button'

function ErrorModal(props) {
    return (
        <Modal
            onCancel={props.onClear}
            header='An Error Occurred'
            show={!!props.error}
            footer={<Button onClick={props.onClear}>Okay</Button>}
        >
            <p>{props.error}</p>
        </Modal>
    )
}