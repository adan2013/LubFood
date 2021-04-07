import React, { useState, useEffect } from 'react'
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
    const [ignredientId, setIngredientId] = useState(obj ? obj.id : null)
    const [value, setValue] = useState(obj ? obj.value : 0)
    console.log('obj', no, obj) // TODO console log
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
    console.log('list', values) // TODO console log
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
    values: PropTypes.array.isRequired,
    onListChange: PropTypes.func.isRequired,
}

const IngredientsPicker = ({value, onChange}) => {
    const [count, setCount] = useState(Math.max(value.length, 3))
    const [val, setVal] = useState(value)
    //useEffect(onChange, [val])
    return(
        <Container>
            <NumberPicker onChange={v => setCount(v)} value={count} minValue={1} maxValue={20} prefix={'Ilość: '} />
            <IngredientsList count={count} values={val} onListChange={v => setVal(v)} />
        </Container>
    )
}

IngredientsPicker.propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
}

IngredientsPicker.defaultProps = {

}

export default IngredientsPicker
