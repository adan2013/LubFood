import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NumberPicker from './NumberPicker'

const Container = styled.div`
    margin: 2px 0;
`

const PanelContainer = styled.div`
    margin-top: 5px;
`

const IngredientPanel = ({no, obj, onPanelChange}) => {

    return(
        <PanelContainer>

        </PanelContainer>
    )
}

IngredientPanel.propTypes = {
    no: PropTypes.number.isRequired,
    obj: PropTypes.object,
    onPanelChange: PropTypes.func.isRequired,
}

const IngredientsList = ({count, values, onListChange}) => {
    const el = []
    const onChange = (no, obj) => {
        const newObj = JSON.parse(JSON.stringify(values))
        newObj[no] = obj
        onListChange(newObj)
    }
    for(let i = 0; i < count; i++) {
        el.push(
            <IngredientPanel key={i} no={i}
                             obj={values[i]}
                             onPanelChange={onChange} />
            )
    }
    return el
}

IngredientsList.propTypes = {
    count: PropTypes.number.isRequired,
    values: PropTypes.object.isRequired,
    onListChange: PropTypes.func.isRequired,
}

const IngredientsPicker = ({initialValues, onChange}) => {
    const [count, setCount] = useState(Object.keys(initialValues).length > 0 ? Object.keys(initialValues).length : 3)
    const [val, setVal] = useState(initialValues)

    return(
        <Container>
            <NumberPicker onChange={v => setCount(v)} value={count} minValue={1} maxValue={20} prefix={'Ilość: '} />
            <IngredientsList count={count} values={val} onListChange={v => setVal(v)} />
        </Container>
    )
}

IngredientsPicker.propTypes = {
    initialValues: PropTypes.object,
    onChange: PropTypes.func.isRequired,
}

IngredientsPicker.defaultProps = {
    initialValues: {},
}

export default IngredientsPicker
