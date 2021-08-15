import React, { Component } from 'react';
import './App.css'

//componets
import Grid from './components/Grid/Grid'

//pices
import { pieceCollection } from './pieceCollection/pieceCollection'


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            grid: null,
            gridHeight: 18,
            gridWidth: 10,
            piece: null
        }
        // this.buildGrid.bind(this)
    }

    initGame = () => {
        this.setState({ grid: this.buildGrid() }, this.generatePiece)
    }

    componentDidMount() {
        this.initGame()
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

    //Get piece
    generatePiece = () => {
        const piece = {}
        piece.posY = 0
        piece.posX = 0
        piece.grid = pieceCollection[0]
        piece.mergeData = []

        const result = this.pieceCanBeMove(piece)

        if (result) {
            this.setState({ piece })
        }
    }

    pieceCanBeMove = (piece) => {

        for (let y = 0; y < piece.grid.length; y++) { //row
            for (let x = 0; x < piece.grid[0].length; x++) { //col

                // console.log(piece.grid[0].length) //  3 3 3 3 3 3

                if (piece.grid[y][x] > 0) {

                    // console.log('row', y + piece.posY)
                    // console.log('col', x + piece.posX)
                    // console.log(this.state.grid[y + piece.posY][x + piece.posX])
                    if (this.state.grid[y + piece.posY][x + piece.posX] > 0) {
                        return false
                    }

                    piece.mergeData.push(y + '_' + x)
                }
            }
        }
        return true
    }

    render() {

        return (
            <div id="tetris-container">
                {
                    this.state.grid ? (<Grid
                        grid={this.state.grid}
                        piece={this.state.piece} />) : null
                }
            </div>
        )
    }
}


export default App;
