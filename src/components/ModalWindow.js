import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

const ModalWindow = ({ show, onCancel, onSubmit, title, text }) => (
    <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {text}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onCancel}>Anuluj</Button>
            <Button variant="danger" onClick={onSubmit}>Potwierdź</Button>
        </Modal.Footer>
    </Modal>
)

ModalWindow.propTypes = {
    show: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string,
    text: PropTypes.string,
}

ModalWindow.defaultProps = {
    show: true,
    title: 'Potwierdzenie',
    text: 'Czy na pewno chcesz kontynuować?',
}

export default ModalWindow
