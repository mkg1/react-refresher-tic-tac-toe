import Player from "./components/Player";
import GameBoard from "./components/Gameboard";
import { useState } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBOS } from "./winning-combos";

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(turns) {
  let gameBoard = [...INITIAL_BOARD.map(array => [...array])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBOS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}


function App() {
  // const [activePlayer, setActivePlayer] = useState('X');  
  const [ players, setPlayers ]= useState(PLAYERS)
  const [turns, setTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false); // unnecessary bc we can derive this

  const gameBoard = deriveGameBoard(turns);

  const winner = deriveWinner(gameBoard, players);

  const activePlayer = deriveActivePlayer(turns);
  
  const hasDraw = turns.length === 9 && !winner;

  function handleSelectSquare(row, col) {
    // setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
    setTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: row, col: col }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    })
  }

  function handleRestart() {
    setTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      }
    }
    )
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={players.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName={players.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} turns={turns} board={gameBoard}/>

      </div>
      <Log turnsData={turns} />
    </main>
  )
}

export default App
