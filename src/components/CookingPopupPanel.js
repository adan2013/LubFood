import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import useTimer from '../hooks/useTimer'

const MIN_FONT_SIZE = 18
const MAX_FONT_SIZE = 50

const PopupMainContainer = styled.div`
  display: ${props => props.hide ? 'none' : 'block'};
  position: fixed;
  left: 0;
  bottom: 180px;
  width: 100%;
`

const PopupContainer = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  width: 320px;
  max-width: 90vw;
  height: 90px;
  margin: 0 auto;
  color: #000;
`

const Title = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 8px 0;
`

const CenterText = styled.div`
  text-align: center;
  font-size: 2rem;
  position: relative;
  bottom: 6px;
  margin: 0 70px;
`

const SideButton = styled(Button)`
  position: absolute;
  left: ${props => props.onRight ? 'inherit' : '10px'};
  right: ${props => props.onRight ? '10px' : 'inherit'};
`

const generateTimerString = timeLeft => {
    if(timeLeft === 0) return `-:--:--`
    let h = Math.floor(timeLeft / 3600)
    let m = Math.floor(timeLeft / 60)
    let s = Math.floor(timeLeft - h * 3600 - m * 60)
    if(m < 10) m = '0' + m
    if(s < 10) s = '0' + s
    return `${h}:${m}:${s}`
}

const CookingPopupPanel = ({popupMode, stepTimerValue, fontSize, onFontSizeChange, onTimeOver}) => {
    const { isRunning, timeLeft, play, pause, setTime, } = useTimer(() => {
        if(onTimeOver) onTimeOver()
    })

    useEffect(() => {
        if(!isRunning) setTime(stepTimerValue * 60)
    }, [stepTimerValue])

    const playPauseButton = () => {
        if(isRunning) {
            pause()
        }else{
            play()
        }
    }

    const resetButton = () => {
        if(!isRunning) setTime(stepTimerValue * 60)
    }

    return(
        <PopupMainContainer hide={popupMode === 'OFF'}>
            <PopupContainer>
                <Title>{popupMode === 'TIMER' ? 'Timer' : 'Rozmiar czcionki'}</Title>
                {
                    popupMode === 'TIMER'
                    ?
                        <>
                            <SideButton variant={'secondary'} onClick={playPauseButton}>
                                <FontAwesomeIcon icon={isRunning ? faPause : faPlay}/>
                            </SideButton>
                            <SideButton variant={'secondary'} onRight disabled={isRunning} onClick={resetButton}>
                                <FontAwesomeIcon icon={faUndo}/>
                            </SideButton>
                            <CenterText>{generateTimerString(timeLeft)}</CenterText>
                        </>
                        :
                        <>
                            <SideButton variant={'secondary'} disabled={fontSize - 2 < MIN_FONT_SIZE} onClick={() => onFontSizeChange(fontSize - 2)}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </SideButton>
                            <SideButton variant={'secondary'} onRight disabled={fontSize + 2 > MAX_FONT_SIZE} onClick={() => onFontSizeChange(fontSize + 2)}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </SideButton>
                            <CenterText>{fontSize}</CenterText>
                        </>
                }
            </PopupContainer>
        </PopupMainContainer>
    )
}

CookingPopupPanel.propTypes = {
    popupMode: PropTypes.string,
    stepTimerValue: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
    onFontSizeChange: PropTypes.func.isRequired,
    onTimeOver: PropTypes.func,
}

CookingPopupPanel.defaultProps = {
    popupMode: 'OFF',
}

export default CookingPopupPanel
