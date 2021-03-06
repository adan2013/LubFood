import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot, faClock, faSearchPlus, faChevronLeft, faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router-dom'
import { getRecipe } from '../firebase/firestore/recipes'
import DataLoader from '../components/DataLoader'
import ModalWindow from '../components/ModalWindow'
import CookingPopupPanel from '../components/CookingPopupPanel'
import getUnitName from '../utils/getUnitName'

const TextContainer = styled.div`
    font-size: ${props => props.fontSize + 'px'};
    padding: 20px 20px 100px;
`

const ControlButtonMainContainer = styled.div`
    position: fixed;
    left: 50%;
    bottom: 0;
    width: 100%;
    max-width: 800px;
    background-color: #3589e3;
    transform: translateX(-50%);
`

const ControlButtonRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 300px;
    margin: 15px auto;
`

const ControlButtonStyle = styled(Button)`
    flex: 1;
    border-radius: 50%;
    display: block;
    max-width: 60px;
    height: 60px;
    margin: 0 auto;
    font-size: 1.6rem;
`

const ControlButton = ({variant = 'light', icon, onClick, disabled}) => (
    <ControlButtonStyle variant={variant} onClick={onClick} disabled={disabled}>
        <FontAwesomeIcon icon={icon} />
    </ControlButtonStyle>
)

ControlButton.propTypes = {
    variant: PropTypes.string,
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
}

const getIngredientList = ingredients => (
    ingredients.map((i, idx) => (
        <div key={i.id}>
            {`${idx+1}. ${i.name} [${getUnitName(i.unit)}]${i.value === 0 ? '' : ' - ' + i.value}`}
        </div>
    ))
)

const Cooking = () => {
    const [ingredientMode, setIngredientMode] = useState(false)
    const [popupMode, setPopupMode] = useState('OFF')
    const [fontSize, setFontSize] = useState(28)
    const [stepNumber, setStepNumber] = useState(0)
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)
    const { push } = useHistory()
    const { category, recipe } = useParams()

    useEffect(() => {
        if(ingredientMode) setIngredientMode(false)
    }, [stepNumber])

    const switchToPrevStep = () => setStepNumber(v => v--)
    const switchToNextStep = () => setStepNumber(v => v++)
    const switchPopup = popupId => setPopupMode(popupId === popupMode ? 'OFF' : popupId)

    return (
        <>
            <DataLoader loader={() => getRecipe(recipe)} viewer={data => (
                <>
                    <TextContainer fontSize={fontSize}>
                        {
                            ingredientMode
                            ?
                            getIngredientList(data.ingredients)
                            :
                            `${stepNumber+1}. ${data.steps[stepNumber].text}`
                        }
                    </TextContainer>
                    <CookingPopupPanel popupMode={popupMode}
                                       stepTimerValue={data.steps[stepNumber].timer}
                                       fontSize={fontSize}
                                       onFontSizeChange={v => setFontSize(v)}
                                       onTimeOver={() => {setTimeout(() => setPopupMode('TIMER'), 0)}} />
                    <ControlButtonMainContainer>
                        <ControlButtonRowContainer>
                            <ControlButton icon={faCarrot}
                                           variant={ingredientMode ? 'warning' : undefined}
                                           onClick={() => setIngredientMode(v => !v)} />
                            <ControlButton icon={faClock}
                                           variant={popupMode === 'TIMER' ? 'warning' : undefined}
                                           onClick={() => switchPopup('TIMER')} />
                            <ControlButton icon={faSearchPlus}
                                           variant={popupMode === 'FONT' ? 'warning' : undefined}
                                           onClick={() => switchPopup('FONT')} />
                        </ControlButtonRowContainer>
                        <ControlButtonRowContainer>
                            <ControlButton icon={faChevronLeft}
                                           disabled={stepNumber === 0}
                                           onClick={switchToPrevStep} />
                            <ControlButton icon={faTimes}
                                           variant={'secondary'}
                                           onClick={() => setExitModalIsOpen(true)} />
                            <ControlButton icon={faChevronRight}
                                           disabled={data.steps.length - 1 <= stepNumber}
                                           onClick={switchToNextStep} />
                        </ControlButtonRowContainer>
                    </ControlButtonMainContainer>
                </>
            )}/>
            <ModalWindow show={exitModalIsOpen}
                         text={'Czy chcesz wyj???? z trybu gotowania?'}
                         onSubmit={() => push(`/recipes/${category}/${recipe}`)}
                         onCancel={() => setExitModalIsOpen(false)} />
        </>
    )
}

export default Cooking
