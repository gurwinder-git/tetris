import React, { Component } from 'react';
import css from './App.module.css'

//componets
import Grid from './components/Grid/Grid'
import NextPiece from './components/NextPiece/NextPiece'
import StartGame from './components/StartGame/StartGame'
import ControlButton from './components/UI/ControlButton/ControlButton'
import MessagePopUp from './components/UI/MessagePopUp/MessagePopUp'

//pices
import { pieceCollection } from './pieceCollection/pieceCollection'


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            grid: null,
            gridHeight: 18,
            gridWidth: 10,
            piece: null,
            clearLines: 0,
            nextPieceIndex: null,
            gameRunning: false,
            heighScore: 0,
            paused: false,
            gameOver: false
        }
        // this.buildGrid.bind(this)
    }

    generateNextPieceIndex = () => {
        return Math.trunc(Math.random() * 7) + 1
    }

    initGame = () => {
        if (this.timerID) {
            clearInterval(this.timerID)
            // console.log(this.timerID)
        }
        this.setState({
            grid: this.buildGrid(),
            nextPieceIndex: this.generateNextPieceIndex(),
            gameRunning: true,
            paused: false,
            clearLines: 0,
            paused: false,
            gameOver: false
        }, () => {
            this.generatePiece()
            this.setTimer()
        })
    }

    setTimer = () => {
        this.timerID = setInterval(() => {
            if (this.state.piece) {
                this.pieceMoveToYAxis(1)
            }
        }, this.levelToTime())
    }

    levelToTime = () => {
        const clearLines = this.state.clearLines

        if (clearLines >= 0 && clearLines <= 3) return 1000
        else if (clearLines >= 4 && clearLines <= 6) return 800
        else if (clearLines >= 7 && clearLines <= 9) return 500
        else if (clearLines >= 10 && clearLines <= 14) return 400
        else return 400
    }

    componentDidMount() {

        document.addEventListener('keydown', (event) => {
            if (!this.state.paused) {
                // console.log(event.keyCode)
                switch (event.keyCode) {
                    case 39:
                        if (this.state.piece) {
                            this.pieceMoveToXAxis(1)
                        }
                        break;

                    case 37:
                        if (this.state.piece) {
                            this.pieceMoveToXAxis(-1)
                        }
                        break;

                    case 40:
                        if (this.state.piece) {
                            this.pieceMoveToYAxis(1)
                        }
                        break;

                    case 88:
                        if (this.state.piece) {
                            this.rotatePiece('right')
                        }
                        break;

                    case 90:
                        if (this.state.piece) {
                            this.rotatePiece('left')
                        }
                        break;

                    default:
                        break;
                }
            }
        })
    }

    buildGrid = () => {
        let grid = []

        for (let y = 0; y < this.state.gridHeight; y++) {
            let line = []
            for (let x = 0; x < this.state.gridWidth; x++) {
                line.push(0)
            }
            grid.push(line)
        }

        return grid
    }

    closeGame = () => {
        // console.log('game over')
        clearInterval(this.timerID)
        this.setState({ gameOver: true })
    }

    //Get piece
    generatePiece = () => {
        const piece = {}
        piece.posY = 0
        piece.posX = 0
        piece.grid = pieceCollection[this.state.nextPieceIndex]
        piece.mergeData = []
        piece.color = Math.trunc(Math.random() * 5) + 1

        let firstLineEmpty = true
        for (let i = 0; i < piece.grid[0].length; i++) {
            if (piece.grid[0][i] > 0) {
                firstLineEmpty = false
            }
        }

        if (firstLineEmpty) {
            piece.posY--
        }

        piece.posX = Math.floor((this.state.gridWidth - piece.grid[0].length) / 2)



        const coordinates = this.pieceCanBeMove(piece)

        if (coordinates) {
            piece.mergeData = coordinates
            this.setState({ piece, nextPieceIndex: this.generateNextPieceIndex() })
        } else {
            this.closeGame()
        }
    }

    pieceCanBeMove = (piece) => {

        const coordinates = []

        for (let y = 0; y < piece.grid.length; y++) { //row
            for (let x = 0; x < piece.grid[0].length; x++) { //col

                // console.log(piece.grid[0].length) //  3 3 3 3 3 3

                if (piece.grid[y][x] > 0) {

                    // console.log('row', y + piece.posY)
                    // console.log('col', x + piece.posX)
                    // console.log(this.state.grid[y + piece.posY][x + piece.posX])

                    if (this.state.grid[y + piece.posY] === undefined) return false

                    if (this.state.grid[y + piece.posY][x + piece.posX] === undefined) return false


                    if (this.state.grid[y + piece.posY][x + piece.posX] > 0) {
                        return false
                    }

                    coordinates.push((y + piece.posY) + '_' + (x + piece.posX))
                }
            }
        }
        return coordinates
    }

    pieceMoveToXAxis = (deltaX) => {
        const piece = { ...this.state.piece }

        if (piece === null) {
            return false
        }

        piece.posX += deltaX

        const coordinates = this.pieceCanBeMove(piece)

        if (coordinates) {
            piece.mergeData = coordinates
            // console.log(coordinates)
            this.setState({ piece })
        }
    }

    pieceMoveToYAxis = (deltaY) => {
        const piece = { ...this.state.piece }

        if (!piece) {
            return false
        }

        piece.posY += deltaY

        const coordinates = this.pieceCanBeMove(piece)

        if (coordinates) {
            piece.mergeData = coordinates
            // console.log(coordinates)
            this.setState({ piece })
        } else {
            this.mergePieceToGrid()
        }
    }

    mergePieceToGrid = () => {
        const virtualGrid = this.state.grid

        this.state.piece.mergeData.forEach(item => {
            const [y, x] = item.split('_')
            virtualGrid[+y][+x] = this.state.piece.color
        })

        const { clearLines, cleanGrid } = this.cleanGridLine(virtualGrid)


        this.setState((pre) => {
            return {
                grid: cleanGrid,
                piece: null,
                clearLines: pre.clearLines + clearLines
            }
        }, () => {
            this.generatePiece()
            clearInterval(this.timerID)
            this.setTimer()
        })

    }

    rotatePiece = (rotation) => {
        const piece = { ...this.state.piece }
        // console.log(piece)

        if (piece === null) return false

        let rotatedGrid = []

        if (rotation === 'right') {
            for (let x = 0; x < piece.grid[0].length; x++) {
                const line = []
                for (let y = piece.grid.length - 1; y > -1; y--) {
                    // console.log(y + '_' + x, '=>', piece.grid[y][x])
                    line.push(piece.grid[y][x])
                }
                rotatedGrid.push(line)
            }
        }

        if (rotation === 'left') {
            for (let x = piece.grid[0].length - 1; x > -1; x--) {
                const line = []
                for (let y = 0; y < piece.grid.length; y++) {
                    line.push(piece.grid[y][x])
                }
                rotatedGrid.push(line)
            }
        }

        piece.grid = rotatedGrid

        let coordinates = this.pieceCanBeMove(piece)

        if (coordinates) {
            piece.mergeData = coordinates
            this.setState({ piece })
        } else {
            let isPositionUpdate = false
            // console.log(piece)

            if (piece.posX < 0) {
                piece.posX = 0
                isPositionUpdate = true
            }
            else if (piece.grid[0].length + piece.posX > this.state.gridWidth) {
                // console.log(piece.grid[0].length + piece.posX)
                piece.posX = this.state.gridWidth - piece.grid[0].length
                isPositionUpdate = true
            } else if (piece.posY < 0) {
                piece.posY = 0
                isPositionUpdate = true
            }

            if (isPositionUpdate) {
                coordinates = this.pieceCanBeMove(piece)

                if (coordinates) {
                    piece.mergeData = coordinates
                    this.setState({ piece })
                }
            }
        }

    }

    // rotatePieceToRight = () => {
    //     const piece = { ...this.state.piece }
    //     // console.log(piece)

    //     if (piece === null) return false

    //     let rotatedGrid = []

    //     for (let x = 0; x < piece.grid[0].length; x++) {
    //         const line = []
    //         for (let y = piece.grid.length - 1; y > -1; y--) {
    //             // console.log(y + '_' + x, '=>', piece.grid[y][x])
    //             line.push(piece.grid[y][x])
    //         }
    //         rotatedGrid.push(line)
    //     }

    //     piece.grid = rotatedGrid

    //     const coordinates = this.pieceCanBeMove(piece)

    //     if (coordinates) {
    //         piece.mergeData = coordinates
    //         this.setState({ piece })
    //     } else {
    //         console.log('you can not rotatez ')
    //     }
    // }

    // rotatePieceToLeft = () => {

    //     const piece = { ...this.state.piece }

    //     if (!piece) return false

    //     const rotatedGrid = []

    //     for (let x = piece.grid[0].length - 1; x > -1; x--) {
    //         const line = []
    //         for (let y = 0; y < piece.grid.length; y++) {
    //             line.push(piece.grid[y][x])
    //         }
    //         rotatedGrid.push(line)
    //     }

    //     piece.grid = rotatedGrid

    //     const coordinates = this.pieceCanBeMove(piece)

    //     if (coordinates) {
    //         piece.mergeData = coordinates
    //         this.setState({ piece })
    //     } else {
    //         console.log('you can not rotatez ')
    //     }
    // }

    cleanGridLine = (grid) => {

        const cleanGrid = []
        let clearLines = 0

        for (let y = 0; y < this.state.gridHeight; y++) {
            let lineCompleted = true
            for (let x = 0; x < this.state.gridWidth; x++) {

                if (grid[y][x] === 0) {
                    lineCompleted = false
                }
            }

            if (lineCompleted === false) {
                cleanGrid.push(grid[y])
            }
        }

        clearLines = this.state.grid.length - cleanGrid.length

        for (let line = 0; line < clearLines; line++) {
            cleanGrid.unshift(createLine(this.state.gridWidth))
        }

        function createLine(width) {
            const line = []
            for (let i = 0; i < width; i++) {
                line.push(0)
            }
            return line
        }

        return { clearLines, cleanGrid }
    }

    pauseGame = () => {
        clearInterval(this.timerID)
        console.log(this.timerID)
        this.setState({ paused: true })
    }

    resumeGame = () => {
        clearInterval(this.timerID)
        this.setState({ paused: false })
        this.setTimer()
    }

    StartGame = () => {
        this.initGame()
    }

    restartGame = () => {
        if (window.confirm('Are you sure')) {
            clearInterval(this.timerID)
            this.initGame()
        }
    }

    render() {
        // console.log(pieceCollection[this.state.nextPieceIndex])

        return (
            <>

                {!this.state.gameRunning ? <StartGame clicked={this.StartGame} /> : null}

                {this.state.paused || this.state.gameOver ?
                    <MessagePopUp resumeGame={this.resumeGame} paused={this.state.paused} gameOver={this.state.gameOver} startGame={this.StartGame} /> :
                    null}

                <div id={css.tetris_container}>

                    {
                        this.state.grid ? (<Grid
                            grid={this.state.grid}
                            piece={this.state.piece} />) : null
                    }

                    <div className={css.right_div}>
                        <h2>tetris</h2>
                        <div className={css.next_piece}>
                            <p>Next Piece</p>
                            {
                                this.state.nextPieceIndex ? <NextPiece grid={pieceCollection[this.state.nextPieceIndex]} /> : ''
                            }
                        </div>
                        <div className={css.scores}>
                            <p>Clear Lines: <span>{this.state.clearLines}</span></p>
                        </div>

                        <div className={css.scores}>
                            <p>High Score: <span>{this.state.heighScore}</span></p>
                        </div>

                        <div className={css.start_pause}>
                            <button onClick={this.restartGame}>Restart</button>
                            <button onClick={this.pauseGame}>Pause</button>
                        </div>

                        <div className={css.controls}>
                            <ControlButton disabled={this.state.paused} clicked={() => this.rotatePiece('left')} type="up">up</ControlButton>
                            <div>
                                <ControlButton disabled={this.state.paused} clicked={() => this.pieceMoveToXAxis(-1)} type="left">left</ControlButton>
                                <ControlButton disabled={this.state.paused} clicked={() => this.pieceMoveToXAxis(1)} type="right">Right</ControlButton>
                            </div>
                            <ControlButton disabled={this.state.paused} clicked={() => this.pieceMoveToYAxis(1)} type="down">Down</ControlButton>
                        </div>

                        <div className={css.guide}>
                            <div>
                                x/z: Rotate
                            </div>
                            <div>
                                <i className="bi bi-arrow-left"></i> Left
                            </div>
                            <div>
                                <i className="bi bi-arrow-right"></i> Right
                            </div>
                            <div>
                                <i className="bi bi-arrow-down"></i> Down
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default App;

