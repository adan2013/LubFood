import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import NumberPicker from './NumberPicker'
import ModalWindow from './ModalWindow'

const Container = styled.div`
  background-color: ${props => props.highlight ? '#ffa14d' : '#ececec'};
  border-radius: 4px;
  margin-bottom: 5px;
  padding: 10px;
  position: relative;
`

const Title = styled.div`
  color: #000;
  line-height: 30px;
  margin-bottom: 6px;
`

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
`

const TextareaCounter = styled.div`
  color: #000;
  font-size: 0.8rem;
  text-align: right;
  margin-right: 8px;
  margin-bottom: 10px;
`

const CornerButton = styled(Button)`
  position: absolute;
  top: 6px;
  right: 10px;
  min-width: 50px;
  text-align: center;
`

const RecipeStepPanel = ({no, stepCount, initialValues, onDelete, onUpdate}) => {
    const [modified, setModified] = useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [text, setText] = useState(initialValues.text)
    const [timer, setTimer] = useState(initialValues.timer)

    const onSaveChanges = () => {
        onUpdate(no - 1, text, timer)
        setModified(false)
    }
    const onTextChange = e => {
        setText(e.target.value)
        setModified(true)
    }
    const onTimerChange = v => {
        setTimer(v)
        setModified(true)
    }

    return(
        <Container highlight={modified}>
            <Title>Krok {no} z {stepCount}</Title>
            {!modified && <CornerButton variant={'danger'} size={'sm'} onClick={() => setDeleteModalIsOpen(true)}><FontAwesomeIcon icon={faTrash}/></CornerButton>}
            {modified && <CornerButton variant={'success'} size={'sm'} onClick={onSaveChanges}><FontAwesomeIcon icon={faCheck}/></CornerButton>}
            <Textarea value={text} onChange={onTextChange} maxLength={400} />
            <TextareaCounter>{text.length}/400</TextareaCounter>
            <NumberPicker value={timer} onChange={onTimerChange} step={[1, 10]} maxValue={180} prefix={'Timer: '} label={' min'} />
            <ModalWindow show={deleteModalIsOpen}
                         onSubmit={() => onDelete(no - 1)}
                         onCancel={() => setDeleteModalIsOpen(false)}
                         text={'Czy chcesz usunąć ten krok? UWAGA: ta operacja zresetuje wszystkie niezapisane dane z pozostałych kroków!'} />
        </Container>
    )
}

RecipeStepPanel.propTypes = {
    no: PropTypes.number.isRequired,
    stepCount: PropTypes.number.isRequired,
    initialValues: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}

export default RecipeStepPanel
