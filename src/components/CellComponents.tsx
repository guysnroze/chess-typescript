import React from "react";
import {Cell} from './models/Cell'

interface CellProps {
    cell: Cell;
    selected: boolean
    click: (cell: Cell) => void
}

const CellComponent = ({cell, selected, click}: CellProps) => {
    
    return (
        <div 
            className={['cell', cell.color, selected ? "selected" : ''].join(' ')}
            onClick={() => click(cell)}
            style={{background: cell.available && cell.figures ? "green" : ''}}
        >
            {cell.available && !cell.figures && <div className={"available"}/>}
            {cell.figures?.logo && <img src={cell.figures.logo} alt=""/>}
        </div>
    )
}

export default CellComponent;