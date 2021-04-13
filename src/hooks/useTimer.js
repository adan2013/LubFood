import { useState, useEffect, useRef } from 'react'

const useTimer = (onTimeOver) => {
    const [status, setStatus] = useState({
        isRunning: false,
        initialTime: 0,
        timeLeft: 0,
    })
    const intervalRef = useRef()

    const update = () => {
        setStatus(current => {
            if(current.timeLeft <= 0) {
                stopService()
                if(onTimeOver) onTimeOver()
                return {
                    ...current,
                    isRunning: false,
                    timeLeft: 0
                }
            }else{
                return {
                    ...current,
                    timeLeft: current.timeLeft - 1
                }
            }
        })
    }

    const stopService = () => {
        if(intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = undefined
        }
    }

    const startService = () => {
        if(!intervalRef.current) {
            intervalRef.current = setInterval(update, 1000)
        }
    }

    const play = () => {
        if(!status.isRunning && status.timeLeft > 0) {
            setStatus(current => ({
                ...current,
                isRunning: true,
            }))
            startService()
        }
    }

    const pause = () => {
        if(status.isRunning) {
            setStatus(current => ({
                ...current,
                isRunning: false,
            }))
            stopService()
        }
    }

    const resetTime = (autoPause = true) => {
        setStatus(current => ({
            ...current,
            isRunning: autoPause ? false : current.isRunning,
            timeLeft: current.initialTime,
        }))
        if(autoPause) stopService()
    }

    const setTime = (newTime, autoStart = false) => {
        setStatus({
            isRunning: false,
            initialTime: newTime,
            timeLeft: newTime,
        })
        stopService()
        if(autoStart) play()
    }

    useEffect(() => stopService, [])

    return {
        isRunning: status.isRunning,
        timeLeft: status.timeLeft,
        play,
        pause,
        resetTime,
        setTime,
    }
}

export default useTimer
