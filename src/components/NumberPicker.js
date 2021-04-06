import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Button, ButtonGroup, Form, InputGroup} from 'react-bootstrap'

const Container = styled.div`
    margin: 2px 0;
`

const Btn = styled(Button)`
  min-width: 70px;
  font-weight: bold;
`

const NumberPicker = ({minValue, maxValue, step, value, onChange, prefix, label, downText, upText}) => {
    const [val, setVal] = useState(value)
    useEffect(() => onChange(val), [val])

    return(
        <Container>
            <InputGroup>
                <InputGroup.Prepend>
                    <Btn variant={'secondary'}
                         onClick={() => setVal(p => p - step)}
                         disabled={val - step < minValue}>
                        {downText}
                    </Btn>
                </InputGroup.Prepend>
                <Form.Control type={'text'}
                              value={`${prefix}${val}${label}`}
                              style={{textAlign: 'center'}}
                              readOnly />
                <InputGroup.Append>
                    <Btn variant={'secondary'}
                         onClick={() => setVal(p => p + step)}
                         disabled={val + step > maxValue}>
                        {upText}
                    </Btn>
                </InputGroup.Append>
            </InputGroup>
        </Container>
    )
}

NumberPicker.propTypes = {
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    prefix: PropTypes.string,
    label: PropTypes.string,
    downText: PropTypes.string,
    upText: PropTypes.string,
}

NumberPicker.defaultProps = {
    minValue: 0,
    maxValue: 100,
    step: 1,
    prefix: '',
    label: '',
    downText: '-',
    upText: '+',
}

export default NumberPicker
