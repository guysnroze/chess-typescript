import React, { useEffect, useState } from "react";
import "./App.css"
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import Modal from "./components/Modal";
import { Board } from "./components/models/Board";
import { Colors } from "./components/models/Colors";
import { Player } from "./components/models/Player";
import Timer from "./components/Timer";

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPLayer] = useState<Player | null>(null)

    useEffect(() => {
        restart()
        setCurrentPLayer(whitePlayer)
    }, [])


    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigure()
        setBoard(newBoard)
    }

    function swapPlayer() {
        setCurrentPLayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div>
        <div className="app">
            <Timer
                restart={restart}
                currentPlayer={currentPlayer}
            />
            {/* <button onClick={() => setModalActive(true)}>Modal</button>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                /> */}
            <BoardComponent
                board={board}
                setBoard={setBoard}    
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div className="blockname">
                <LostFigures 
                    title="Черные фигуры:" 
                    figures={board.lostBlackFigures}/>
                <LostFigures 
                    title="Белые фигуры:" 
                    figures={board.lostWhiteFigures}/>
            </div>
        </div>
        </div>
        
    )
}

export default App;