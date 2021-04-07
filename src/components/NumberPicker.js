import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Form, InputGroup } from 'react-bootstrap'

const Container = styled.div`
    margin: 2px 0;
`

const Btn = styled(Button)`
  min-width: 50px;
  font-weight: bold;
`

const NumberPicker = ({minValue, maxValue, step, value, onChange, prefix, label}) => {
    const [val, setVal] = useState(value)
    useEffect(() => onChange(val), [val, onChange])

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
                                     onClick={() => setVal(v => v - s)}
                                     disabled={val - s < minValue}>
                                    -{s}
                                </Btn>
                            ))
                        }
                    </InputGroup.Prepend>
                }
                <Form.Control type={'text'}
                              value={`${prefix}${val}${label}`}
                              style={{textAlign: 'center'}}
                              readOnly />
                {
                    step
                    &&
                    <InputGroup.Append>
                        {
                            step.map(s => (
                                <Btn key={'up'+s} variant={'secondary'}
                                     onClick={() => setVal(v => v + s)}
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
}

NumberPicker.defaultProps = {
    minValue: 0,
    maxValue: 100,
    step: [1],
    prefix: '',
    label: '',
}

export default NumberPicker
