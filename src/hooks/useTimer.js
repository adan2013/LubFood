import { useState, useEffect, useRef } from 'react'

const useTimer = (onTimeOver) => {
    const [status, setStatus] = useState({
        isRunning: false,
        startTime: 0,
        initialTime: 0,
        timeLeft: 0,
        lastSetTimeValue: 0,
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
                    timeLeft: Math.floor(current.initialTime - (new Date() - current.startTime.getTime()) / 1000)
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
            intervalRef.current = setInterval(update, 100)
            update()
        }
    }

    const play = () => {
        if(!status.isRunning && status.timeLeft > 0) {
            setStatus(current => ({
                ...current,
                isRunning: true,
                initialTime: current.timeLeft,
                startTime: new Date(),
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
            startTime: new Date(),
            initialTime: current.lastSetTimeValue,
            timeLeft: current.lastSetTimeValue,
        }))
        if(autoPause) stopService()
    }

    const setTime = (newTime, autoStart = false) => {
        setStatus({
            isRunning: false,
            startTime: 0,
            initialTime: newTime,
            timeLeft: newTime,
            lastSetTimeValue: newTime,
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
