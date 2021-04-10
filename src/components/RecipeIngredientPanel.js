import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import NumberPicker from './NumberPicker'
import ModalWindow from './ModalWindow'
import config from '../config'

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

const CornerButton = styled(Button)`
  position: absolute;
  top: 6px;
  right: 10px;
  min-width: 50px;
  text-align: center;
`

const DropdownSelector = styled.select`
  width: 100%;
  margin-bottom: 10px;
  padding: 4px;
  border-radius: 4px;
`

const getUnitName = unitCode => {
    const unit = config.ingredientUtils.find(i => i.code === unitCode)
    return unit ? unit.name : ''
}

const getUnitConfig = (dictionary, ingredientId) => {
    if(ingredientId === '' || ingredientId === undefined) return {}
    const unitCode = dictionary.find(i => i.id === ingredientId).unit
    const uc = config.ingredientUtils.find(i => i.code === unitCode)
    if(!uc) return {}
    return { minValue: uc.min, maxValue: uc.max, step: uc.step, label: uc.label, code: uc.code }
}

const getIngredient = (dictionary, ingredientId) => {
    const item = dictionary.find(i => i.id === ingredientId)
    if(!item) return { id: '', name: '', unit: '' }
    return { id: item.id, name: item.name, unit: item.unit }
}

const IngredientSelector = ({dictionary, value, onChange}) => {

    return(
        <DropdownSelector value={value} onChange={e => onChange(e.target.value)}>
            <option value={''}> - wybierz składnik z listy - </option>
            {dictionary.map(item => (<option key={item.id} value={item.id}>{item.name} [{getUnitName(item.unit)}]</option>))}
        </DropdownSelector>
    )
}

IngredientSelector.propTypes = {
    dictionary: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

const RecipeIngredientPanel = ({no, dictionary, initialValues, onDelete, onUpdate}) => {
    const [modified, setModified] = useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [ingredientId, setIngredientId] = useState(initialValues.id)
    const [value, setValue] = useState(initialValues.value)

    const unitConfig = getUnitConfig(dictionary, ingredientId)

    const onSaveChanges = () => {
        onUpdate(no - 1, getIngredient(dictionary, ingredientId), value)
        setModified(false)
    }
    const onIngredientChange = v => {
        setValue(0)
        setIngredientId(v)
        setModified(true)
    }
    const onTimerChange = v => {
        setValue(v)
        setModified(true)
    }

    return(
        <Container highlight={modified}>
            <Title>Składnik nr {no}</Title>
            {!modified && <CornerButton variant={'danger'} size={'sm'} onClick={() => setDeleteModalIsOpen(true)}><FontAwesomeIcon icon={faTrash}/></CornerButton>}
            {modified && <CornerButton variant={'success'} size={'sm'} onClick={onSaveChanges}><FontAwesomeIcon icon={faCheck}/></CornerButton>}
            <IngredientSelector onChange={onIngredientChange} dictionary={dictionary} value={ingredientId} />
            {ingredientId !== '' && unitConfig.code !== 'UNKNOW' && <NumberPicker value={value} onChange={onTimerChange} {...unitConfig} />}
            <ModalWindow show={deleteModalIsOpen}
                         onSubmit={() => onDelete(no - 1)}
                         onCancel={() => setDeleteModalIsOpen(false)}
                         text={'Czy chcesz usunąć ten składnik? UWAGA: ta operacja zresetuje wszystkie niezapisane dane z pozostałych składników!'} />
        </Container>
    )
}

RecipeIngredientPanel.propTypes = {
    no: PropTypes.number.isRequired,
    dictionary: PropTypes.array.isRequired,
    initialValues: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}

export default RecipeIngredientPanel
