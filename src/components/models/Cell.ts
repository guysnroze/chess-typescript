import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
    //readonly - неизменяемое значение
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figures: Figure | null;
    board: Board;
    available: boolean; // Можешь ли переместиться
    id: number //для реакт ключей

    constructor(board: Board, x: number, y: number, color: Colors, figures: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figures = figures;
        this.board = board;
        this.available = false;
        this.id = Math.random()
    }

    isEmpty(): boolean {
        return this.figures === null
    }


    isEnemy(target: Cell): boolean {
        if (target.figures) {
            return this.figures?.color !== target.figures.color
        }
        return false
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false
        }

        const min = Math.min(this.y, target.y)
        const max = Math.max(this.y, target.y)
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false
        }

        const min = Math.min(this.x, target.x)
        const max = Math.max(this.x, target.x)
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        return true
    } 
    
    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)
        if (absY !== absX)
            return false

        const dy = this.y < target.y ? 1 : -1
        const dx = this.y < target.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx*i, this.y + dy*i).isEmpty())
                return false
        }
        return true
    }

    setFigure(figures: Figure) {
        this.figures = figures
        this.figures.cell = this
    }

    addLostFigure(figures: Figure) {
      figures.color === Colors.BLACK 
        ? this.board.lostBlackFigures.push(figures)
        : this.board.lostWhiteFigures.push(figures)
    }

    moveFigure(target: Cell) {
        if (this.figures && this.figures?.canMove(target)) {
            this.figures.moveFigure(target)
            if (target.figures) {
                this.addLostFigure(target.figures)
            }
            target.setFigure(this.figures)
            this.figures = null
        }
    }
}