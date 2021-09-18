import React from 'react'
import Modal from 'react-modal'

const RemoveModal = (props) => {
    return (
        <Modal
        isOpen={props.openModal}
        contentLabel="Remove Option"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">Remove Expense</h3>
        <p className="modal__body">Are you sure?</p>
        <button className="button" style={{marginRight: '3px'}} onClick={props.onRemove}>Ok</button>
        <button className="button" onClick={props.closeModal} >Cancel</button>
    </Modal>
    )
}

export default RemoveModal