
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './ModalConfirm.scss'
import { XIcon } from '@primer/octicons-react'

const ModalConfirm = ({ ...props }) => {

    return (

        <Modal className="modal-confirm" show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.msg}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={() => props.setShowModal(false)}>
                    <XIcon size={16} /> {props.annuler}
                </Button>
                <Button variant="danger" size="sm" onClick={props.action}>
                    {props.validerIcon} {props.valider}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ModalConfirm.propTypes = {
    title: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    annuler: PropTypes.string.isRequired,
    valider: PropTypes.string.isRequired,
    validerIcon: PropTypes.object,
    action: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired
}

export default ModalConfirm


