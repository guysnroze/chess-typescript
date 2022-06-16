import React, { useEffect, useRef, useState } from "react";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
}

const Timer = ({restart, currentPlayer}: TimerProps) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    const [modalActive, setModalActive] = useState(false)
    
    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        } 
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWHiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
        
    }



    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)

    }
    function decrementWHiteTimer() {
        setWhiteTime(prev => prev - 1)
        
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }


    return (
        <div className="block">
            <div>
                <button className="restart" onClick={handleRestart}>Restart game</button>
            </div>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>

        </div>
    )
}

export default Timer;