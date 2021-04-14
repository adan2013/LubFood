import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
    position: relative;
    text-align: center;
    margin: 10px auto;
    font-size: 24px;
    font-weight: bold;
`

const Btn = styled(Button)`
    position: absolute;
    min-width: 60px;
    left: ${props => props.onRight ? 'inherit' : '10px'};
    right: ${props => props.onRight ? '10px' : 'inherit'};
`

const SideButton = ({ onRight, buttonObj }) => {
    const { push } = useHistory()
    if(buttonObj) {
        return(
            <Btn variant={buttonObj.variant} onRight={onRight} onClick={() => push(buttonObj.link)}>
                <FontAwesomeIcon icon={buttonObj.icon}/>
            </Btn>
        )
    }else{
        return <></>
    }
}

SideButton.propTypes = {
    onRight: PropTypes.bool,
    buttonObj: PropTypes.object
}

SideButton.defaultProps = {
    onRight: false
}

const CardTitle = ({children, leftButton, rightButton}) => (
    <Container>
        <SideButton buttonObj={leftButton}/>
        {children}
        <SideButton onRight buttonObj={rightButton}/>
    </Container>
)

CardTitle.propTypes = {
    children: PropTypes.string.isRequired,
    leftButton: PropTypes.object,
    rightButton: PropTypes.object,
}

export default CardTitle
