import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Form, InputGroup } from 'react-bootstrap'

const Container = styled.div`
    margin: 2px 0;
`

const Btn = styled(Button)`
  min-width: 40px;
  font-weight: bold;
  font-size: 12px;
`

const NumberPicker = ({minValue, maxValue, step, value, onChange, prefix, label, zeroCustomText}) => {
    const [val, setVal] = useState(value)
    useEffect(() => setVal(value), [value])

    const updateValue = diff => {
        setVal(v => {
            const newValue = Math.round((v + diff) * 100) / 100
            onChange(newValue)
            return newValue
        })
    }

    return(
        <Container>
            <InputGroup>
                {
                    step
                    &&
                    <InputGroup.Prepend>
                        {
                            step.slice().reverse().map(s => (
                                <Btn key={'dn'+s} variant={'secondary'}
                                     onClick={() => updateValue(-s)}
                                     disabled={val - s < minValue}>
                                    -{s}
                                </Btn>
                            ))
                        }
                    </InputGroup.Prepend>
                }
                <Form.Control type={'text'}
                              value={val === 0 && zeroCustomText ? zeroCustomText : `${prefix}${val}${label}`}
                              style={{textAlign: 'center'}}
                              readOnly />
                {
                    step
                    &&
                    <InputGroup.Append>
                        {
                            step.map(s => (
                                <Btn key={'up'+s} variant={'secondary'}
                                     onClick={() => updateValue(s)}
                                     disabled={val + s > maxValue}>
                                    +{s}
                                </Btn>
                            ))
                        }
                    </InputGroup.Append>
                }
            </InputGroup>
        </Container>
    )
}

NumberPicker.propTypes = {
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    step: PropTypes.array,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    prefix: PropTypes.string,
    label: PropTypes.string,
    zeroCustomText: PropTypes.string,
}

NumberPicker.defaultProps = {
    minValue: 0,
    maxValue: 100,
    step: [1],
    prefix: '',
    label: '',
}

export default NumberPicker
